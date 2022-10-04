"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const store = new user_1.UserStore();
const request = (0, supertest_1.default)(server_1.default);
describe("Test Endpoint responses", () => {
    // done is specific to supertest
    // done is passed so supertest would know that the test is done so it disconnects from the server.
    it('Successful endpoint call', async () => {
        const response = await request.get('/show/1');
        console.log(response.body);
        expect(response.status).toBe(200);
        // done();
    });
});
describe("Testing Database Models functionality", () => {
    it('Should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it("Expect retrieval of list of users", async () => {
        const res = await store.index();
        expect(res).toEqual([]);
    });
});
