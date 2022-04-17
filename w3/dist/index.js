"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// First thing to do is to instantiate our Express object
// and set up an initial port to run our server on.
const app = (0, express_1.default)();
const port = 3000;
// Lets create our first server endpoint.
app.get('/api', (req, res) => {
    console.log("Howdy, developer.");
    res.send("Server is working!!");
});
// App port listener.
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
