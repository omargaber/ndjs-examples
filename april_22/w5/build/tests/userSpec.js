"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const store = new user_1.UserStore();
describe("Testing Database Models functionality", () => {
    it('Should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it("Expect retrieval of list of users", async () => {
        const res = await store.index();
        expect(res).toEqual([]);
    });
});
