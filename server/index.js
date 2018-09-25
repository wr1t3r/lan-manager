import express from 'express';
import path from 'path';

let steam = require('steam-login');

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev.js';

let app = express();

const compiler = webpack(webpackConfig);

app.use(require('express-session')({ resave: false, saveUninitialized: false, secret: 'B1923D96E9AD134F9F54A5067A2D0797' }));
app.use(steam.middleware({
    realm: 'http://localhost:80/',
    verify: 'http://localhost:80/verify',
    apiKey: process.argv[2]}
));
app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));
app.use(webpackHotMiddleware(compiler));
app.use(express.static('public'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
    console.log("Steam user:",req.user);
});

app.get('/authenticate', steam.authenticate(), function(req, res) {
    res.redirect('/');
});

app.get('/verify', steam.verify(), function(req, res) {
    res.send(req.user).end();
});

app.get('/logout', steam.enforceLogin('/'), function(req, res) {
    req.logout();
    res.redirect('/');
});

app.listen(80, () => console.log("Running on localhost:80"));
