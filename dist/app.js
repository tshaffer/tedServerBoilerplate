"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
// import cookieParser from 'cookie-parser';
const config_1 = require("./config");
const bodyParser = require('body-parser');
const routes_1 = require("./routes/routes");
const controllers_1 = require("./controllers");
class App {
    constructor() {
        this.route = new routes_1.Routes();
        (0, config_1.readConfig)('/Users/tedshaffer/Documents/Projects/tedClientServerBoilerplate/tedServerBoilerplate/src/config/config.env');
        (0, db_1.default)();
        this.app = (0, express_1.default)();
        this.config();
        this.app.use(express_1.default.static(__dirname + '/public'));
        this.app.use((0, cors_1.default)());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.route.routes(this.app);
        this.app.get('/api/v1/test', controllers_1.getTest);
        this.app.post('/api/v1/test', controllers_1.postTest);
    }
    config() {
        let port = process.env.PORT;
        if (port === undefined || port === null || port === '') {
            port = 8888;
        }
        this.app.set('port', port);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map