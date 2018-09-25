import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev.js';

const lan_ip = '192.168.5.124';
let steam = require('steam-login');
let app = express();
const cors = require("cors");
const compiler = webpack(webpackConfig);
let firebase = require('firebase');
require('firebase/auth');
require('firebase/database');

const config = {
    apiKey: 'AIzaSyC75MS4xWh1AAa_NLW6U49dPCo75WYOsD8',
    authDomain: 'http://'+lan_ip,
    databaseURL: 'https://lan-manager-firebase.firebaseio.com/',
    storageBucket: '',
    messagingSenderId: ''
};

firebase.initializeApp(config);

app.use(require('express-session')({ resave: false, saveUninitialized: false, secret: 'B1923D96E9AD134F9F54A5067A2D0797' }));
app.use(steam.middleware({
    realm: 'http://'+lan_ip,
    verify: 'http://'+lan_ip+'/#verify',
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
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});
app.get('/authenticate', steam.authenticate(), function(req, res) {
    res.redirect('/');
});

app.get('/#verify', steam.verify(), function(req, res) {
    // Add/Update firebase database
    if(req.user.steamid) {
        const usersRef = firebase.database().ref("users");
        usersRef.update({
            [req.user.steamid]: req.user
        });
    }

    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/logout', steam.enforceLogin('/'), function(req, res) {
    req.logout();
    res.redirect('/');
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(80, () => console.log("Running on localhost:80"));
