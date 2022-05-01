"use strict";
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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe("Testing account resource endpoints", () => {
    const accountsPath = '/api/accounts';
    it('gets /', () => __awaiter(void 0, void 0, void 0, function* () {
        const respone = yield request.get(accountsPath);
        // console.log(JSON.stringify(respone.body))
        expect(respone.status).toBe(200);
    }));
    it('get missing last_name', () => __awaiter(void 0, void 0, void 0, function* () {
        const respone = yield request.get(`${accountsPath}?first_name=Mo`);
        console.log(JSON.stringify(respone));
        expect(respone.text).toBe("Last Name Missing");
    }));
});
