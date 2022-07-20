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
const loans = express_1.default.Router();
// Get Loans
loans.get('/', (req, res) => {
    if (req.query == {}) {
        res.send('Loans ready.');
    }
    else {
    }
});
loans.post('/', utils.logger, (req, res) => {
    const data = req.body;
    const writeData = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const clientName = `${data.first_name}${data.last_name}`;
            const dirPath = `./assets/accounts/${data.first_name}${data.last_name}.json`;
            const loanPath = `./assets/loans/${data.first_name}${data.last_name}.json`;
            const clientExist = utils.loansFileChecker(clientName);
            if (clientExist) {
                const loanFileInfo = yield fs_1.promises.open(`${loanPath}`, 'a+');
                const accountInfo = yield (0, fs_1.readFile)(dirPath, 'utf-8', (err, data) => __awaiter(void 0, void 0, void 0, function* () {
                    const accountInfo = JSON.parse(data);
                    accountInfo['loan_amount'] = accountInfo.balance * 10000;
                    accountInfo['status'] = 'Approved';
                    delete accountInfo['balance'];
                }));
                yield loanFileInfo.write(JSON.stringify(accountInfo));
                res.send('Loan Created Successfully');
            }
            else {
                res.send("Client doesn't exist");
            }
        }
        catch (err) {
            console.log(err);
        }
    });
    writeData();
});
exports.default = loans;
