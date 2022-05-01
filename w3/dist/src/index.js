"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
// First thing to do is to instantiate our Express object
// and set up an initial port to run our server on.
const app = (0, express_1.default)();
const port = 3000;
app.use('/api', express_1.default.json(), index_1.default);
// App port listener.
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
exports.default = app;
