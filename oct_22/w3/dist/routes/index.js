"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_1 = __importDefault(require("./api/account"));
// import loans from './api/loans';
const routes = express_1.default.Router();
// Lets create our first server endpoint.
routes.get('/', (req, res) => {
    console.log("Howdy, developer.");
    res.send("Server is working!!");
});
routes.use('/accounts', account_1.default);
// routes.use('/loans', loans);
exports.default = routes;
