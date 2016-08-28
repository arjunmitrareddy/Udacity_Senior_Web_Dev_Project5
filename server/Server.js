import express from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import socketio from 'socket.io';
import events from 'events';

events.EventEmitter.prototype._maxListeners = 100;

const FETCH_INTERVAL = 1000;

export default class Server {
    constructor(port) {
        this._app = express();
        this._port = port;
        this._appServerUp = false;
        this._geobackup = null;
        this._appServer = http.createServer(this._app);
        this._sio = socketio.listen(this._appServer);
        this._app.use(bodyParser.urlencoded({ extended: true }));
        this._app.use(bodyParser.json());
        this._serveStaticFiles();
        this._app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../public/index.html'));
        });
        /*this._sio.sockets.on('connection', (socket) => {
            socket.on('poll-client-metrics', () => {
                this._processMetricsData(socket);
            });
        })*/
    }
    _serveStaticFiles() {
        this._app.use('/js', express.static('../public/js', { maxAge: 0 }));
        this._app.use('/sw.js', express.static('../public/sw.js', { maxAge: 0 }));
        this._app.use('/manifest.json', express.static('../public/manifest.json', { maxAge: 0}));
        this._app.use('/styles', express.static('../public/styles', { maxAge: 0 }));
        this._app.use('/imgs', express.static('../public/imgs', { maxAge: 0 }));
        this._app.use('/fonts', express.static('../public/fonts', { maxAge: 0 }));
        this._app.use('/templates', express.static('../public/templates', { maxAge: 0 }));
        this._app.use('/json', express.static('../public/json', { maxAge: 0 }));
    }
    _listen() {
        if (!this._appServerUp) {
            this._appServer.listen(process.env.PORT || this._port, "0.0.0.0", _ => {
                console.log("\n\n ***** Server Listening on localhost:" + this._port + " ***** \n\n");
            });
            this._appServerUp = true;
        }
    }



}