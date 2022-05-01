"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramValidator = exports.loansFileChecker = exports.dirExistChecker = exports.logger = void 0;
const fs_1 = require("fs");
const logger = (req, res, next) => {
    console.log('LOGGER MIDDLEWARE CALLED!');
    // Why is next important??
    next();
};
exports.logger = logger;
const dirExistChecker = (resourceName) => {
    const dirPath = `./assets/${resourceName}`;
    if (!(0, fs_1.existsSync)(dirPath)) {
        (0, fs_1.mkdirSync)(dirPath);
        console.log('Directory Created.');
    }
    else {
        console.log('Directory Exists');
    }
    return dirPath;
};
exports.dirExistChecker = dirExistChecker;
const loansFileChecker = (clientName) => {
    const dirPath = `./assets/accounts/${clientName}.json`;
    if (!(0, fs_1.existsSync)(dirPath)) {
        console.log("Client doesn't exist.");
        return false;
    }
    else {
        return true;
    }
};
exports.loansFileChecker = loansFileChecker;
const paramValidator = (request) => {
    try {
        if (!request.query.first_name && !request.query.last_name) {
            return [true, 'INDEX'];
        }
        else if (!request.query.first_name) {
            return [false, 'First Name missing.'];
        }
        else if (!request.query.last_name) {
            return [false, 'Last Name missing.'];
        }
        else {
            return [true, `${request.query.first_name}${request.query.last_name}`];
        }
    }
    catch (err) {
        return [false, 'Error Occurred'];
    }
};
exports.paramValidator = paramValidator;
