"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var users_1 = __importDefault(require("./handlers/users"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
// const corsConfig = {
//     origin: 'somesite.com',
//     optionalSuccessStatus: 200
// }
// app.use(cors(corsConfig))
app.use(body_parser_1["default"].json());
// app.get('/', function (req: Request, res: Response) {
//     res.send('Hello World!')
// })
(0, users_1["default"])(app);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
