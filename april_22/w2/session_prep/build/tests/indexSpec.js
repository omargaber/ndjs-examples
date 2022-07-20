"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
it('expect adder(5, 7) to equal 12', () => {
    expect((0, index_1.default)(5, 7)).toEqual(12);
});
