"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils = __importStar(require("../../utils/utils"));
const fs_1 = require("fs");
const accounts = express_1.default.Router();
// Get accounts
accounts.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const readData = () => __awaiter(void 0, void 0, void 0, function* () {
        const validatedData = utils.paramValidator(req);
        console.log(`========>> ${validatedData}`);
        if (validatedData[0]) {
            if (validatedData[1] != 'INDEX') {
                const dirPath = `./assets/accounts/${validatedData[1]}.json`;
                yield (0, fs_1.readFile)(dirPath, 'utf-8', (err, data) => __awaiter(void 0, void 0, void 0, function* () {
                    res.send(JSON.parse(data));
                }));
            }
            else {
                console.log("ENTERED HERE");
                res.send('Accounts Ready.');
                return;
            }
        }
        else {
            res.send(validatedData[1]);
        }
    });
    yield readData();
}));
accounts.post('/', utils.logger, (req, res) => {
    const data = req.body;
    const writeData = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const dirPath = utils.dirExistChecker('accounts');
            const accountInfoFile = yield fs_1.promises.open(`${dirPath}/${data.first_name}${data.last_name}.json`, 'a+');
            yield accountInfoFile.write(JSON.stringify(data));
            res.send('Created Successfully');
            return;
        }
        catch (err) {
            console.log(err);
        }
    });
    writeData();
});
accounts.use('/accounts', accounts);
exports.default = accounts;
