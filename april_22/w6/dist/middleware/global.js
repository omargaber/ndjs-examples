"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secret = process.env.TOKEN_SECRET;
var verifyAuthToken = function (req, res, next) {
    try {
        var authHeader = req.headers.authorization;
        var token = authHeader.split(' ')[1];
        var decoded = jsonwebtoken_1["default"].verify(token, secret);
        next();
    }
    catch (err) {
        res.status(401);
        res.json("An error occurred: ".concat(err));
        return;
    }
};
exports["default"] = verifyAuthToken;
