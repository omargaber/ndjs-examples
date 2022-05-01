"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramValidator = exports.directoryExist = exports.accountsLevelLogger = exports.appLevelLogger = void 0;
const fs_1 = require("fs");
const appLevelLogger = (req, res, next) => {
    console.log("App level logger triggered.");
    next();
};
exports.appLevelLogger = appLevelLogger;
const accountsLevelLogger = (req, res, next) => {
    console.log("Accounts level logger triggered.");
    next();
};
exports.accountsLevelLogger = accountsLevelLogger;
const directoryExist = (resourceName) => {
    const directoryPath = `./assets/${resourceName}`;
    if (!(0, fs_1.existsSync)(directoryPath)) {
        (0, fs_1.mkdirSync)(directoryPath);
        console.log('Created');
    }
    else {
        console.log("Exists");
    }
    return directoryPath;
};
exports.directoryExist = directoryExist;
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
