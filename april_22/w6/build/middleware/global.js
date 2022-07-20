"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.TOKEN_SECRET;
const verifyAuthToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        next();
    }
    catch (err) {
        res.status(401);
        res.json(`An error occurred: ${err}`);
        return;
    }
};
exports.default = verifyAuthToken;
