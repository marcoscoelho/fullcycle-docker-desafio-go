const express = require('express');
const path = require('path');

class Server {
    constructor({ host, port }) {
        this.app = express();
        this.host = host;
        this.port = port;
        this.setup();
    }

    setup() {
        const viewsDirPath = path.join(__dirname, './views');
        this.app.set('view engine', 'ejs');
        this.app.set('views', viewsDirPath);
    }

    registerRoutes(cb) {
        cb(this.app);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`\nServer listening at http://${this.host}:${this.port}`)
        });
    }
}

module.exports = Server;
