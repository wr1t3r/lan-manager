import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev.js';

const http = require('http');
const socketServer =require('socket.io');

let steam = require('steam-login');
let app = express();
const cors = require("cors");
const compiler = webpack(webpackConfig);
let firebase = require('firebase');
require('firebase/auth');
require('firebase/database');

require('dotenv').load();
const lan_ip = process.env.LOCAL_IP_ADDRESS;
const API_KEY = process.env.FIREBASE_API_KEY;
const config = {
    apiKey: API_KEY,
    authDomain: 'http://'+lan_ip,
    databaseURL: 'https://lan-manager-firebase.firebaseio.com/',
    storageBucket: '',
    messagingSenderId: ''
};

firebase.initializeApp(config);

app.use(require('express-session')({ resave: false, saveUninitialized: false, secret: 'B1923D96E9AD134F9F54A5067A2D0797' }));
app.use(steam.middleware({
    realm: 'http://'+lan_ip,
    verify: 'http://'+lan_ip+'/verify',
    apiKey: 'B1923D96E9AD134F9F54A5067A2D0797'}
));

app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));
app.use(webpackHotMiddleware(compiler));
app.use(express.static('public'));

app.use(cors({ origin: true }));


app.get('/firebase', function(req, res) {
    const usersRef = firebase.database().ref("users");
    /* update alainsawesome nickname directly, leave everything else
    usersRef.update({
        "alanisawesome/nickname": "Alan The Machine",
        "gracehop/nickname": "Amazing Grace"
    });
    */
    /* Override everything
    usersRef.set({
        alanisawesome: {
            date_of_birth: "June 23, 1912",
            full_name: "Alan Turing"
        },
        gracehop: {
            date_of_birth: "December 9, 1906",
            full_name: "Grace Hopper"
        }
    });
    */
    /* Query one
    dbRef.once("value").then(snap => {
        console.log(snap.key);
        console.log(snap.val());
    }).catch(error => {
        console.log("eroror", error);
    });
    */
});
app.get('/authenticate', steam.authenticate(), function(req, res) {
    res.redirect('/');
});

app.get('/verify', steam.verify(), function(req, res) {
    // Add/Update firebase database
    if(req.user.steamid) {
        const usersRef = firebase.database().ref("users");
        usersRef.update({
            [req.user.steamid]: JSON.parse( JSON.stringify( req.user ) )
        });
    }

    res.redirect('/#/verify?steamid=' + req.user.steamid);
    //res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/logout', steam.enforceLogin('/'), function(req, res) {
    req.logout();
    res.redirect('/');
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

let serve = http.createServer(app);
let io = socketServer(serve);
serve.listen(80,()=> {console.log("+++Gethyl Express Server with Socket Running!!!")});



/***************************************************************************************** */
/* Socket logic starts here																   */
/***************************************************************************************** */
const connected_users = {};
let current_teams = undefined;
let current_tournament = undefined;
let last_servers = "";
io.on('connection', function (socket) {

    if(current_teams) {
        io.sockets.emit('generateTeams', {teams: current_teams});
    }
    if(current_tournament) {
        io.sockets.emit('generateTournament', {tournament: current_tournament});
    }
    if(last_servers != "") {
        io.sockets.emit('setServersText', {server_text: last_servers});
    }

    socket.on('disconnect', function(){
        delete connected_users[socket.id];
        io.sockets.emit('connectedUsers', { connected_users: connected_users });
    });
    socket.on('removeUser', function(){
        delete connected_users[socket.id];
        io.sockets.emit('connectedUsers', { connected_users: connected_users });
    });

    socket.on('addUser',(user)=>{
        if(user.steam_id != '') {
            if(!userExists(user.steam_id)) {
                connected_users[socket.id] = {
                    steam_id: user.steam_id,
                    link: user.profile.profile,
                    username: user.profile.username,
                    avatar_link: user.profile.avatar.small,
                };
            }
            io.sockets.emit('connectedUsers', {connected_users: connected_users});
        }
    });

    socket.on('generateTeams',(teams)=>{
        current_teams = teams;
        io.sockets.emit('generateTeams', {teams: teams});
    });

    socket.on('generateTournament',(tournament)=>{
        current_tournament = tournament;
        io.sockets.emit('generateTournament', {tournament: tournament});
    });

    socket.on('setServersText',(server_text)=>{
        last_servers = server_text;
        io.sockets.emit('setServersText', {server_text: server_text});
    });
});

let userExists = (steam_id) =>{
    let userExist = false;

    Object.keys(connected_users).forEach(function(element) {
        if(steam_id == connected_users[element].steam_id) {
            userExist = true;
        }
    });

    return userExist;
};
