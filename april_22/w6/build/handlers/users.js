"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const global_1 = __importDefault(require("../middleware/global"));
const secret = process.env.TOKEN_SECRET;
const store = new user_1.UserStore();
const index = async (req, res) => {
    const users = await store.index();
    res.json(users);
};
const show = async (req, res) => {
    // Verifying the existence of valid token
    // before writing it as middleware function
    // try{
    //     // var token = req.headers.authorization as string
    //     // // jwt.verify(req.body.token, secret)
    //     // jwt.verify(token, secret)
    // }
    // catch (err) {
    //     res.status(401)
    //     res.json(`Invalid token ${err}`)
    //     return
    // }
    const user_id = parseInt(req.params.id);
    try {
        const authHeader = req.headers.authorization?.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(authHeader, secret);
        if (decoded.user.id !== user_id) {
            res.json('User ID mismatch with token');
            return;
        }
        else {
            const user = await store.show(req.params.id);
            // const updatedUser = await store.update(user, req.body);
            res.json(user);
            return;
        }
    }
    catch (err) {
        res.json(err);
    }
    const user = await store.show(req.params.id);
    res.json(user);
};
const create = async (req, res) => {
    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        balance: req.body.balance,
        email: req.body.email,
        password: req.body.password
    };
    const newUser = await store.create(user);
    // Creating tokens and returning it to the client side
    var token = jsonwebtoken_1.default.sign({ user: newUser }, secret);
    res.json(token);
};
const showSavings = async (req, res) => {
    const savings = await store.showSavings(req.params.id);
    res.json(savings);
};
const login = async (req, res) => {
    const userAuth = await store.authenticate(req.body.email, req.body.password);
    if (userAuth) {
        var token = jsonwebtoken_1.default.sign({ user: userAuth }, secret);
        res.json(token);
    }
    else {
        res.json(userAuth);
    }
};
const update = async (req, res) => {
    const user_id = parseInt(req.params.id);
    // console.log(req.params)
    // const email =  req.body.email
    // const password = req.body.password
    try {
        const authHeader = req.headers.authorization?.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(authHeader, secret);
        if (decoded.user.id !== user_id) {
            throw new Error('User ID mismatch with token');
        }
        else {
            const user = await store.show(req.params.id);
            const updatedUser = await store.update(user, req.body);
            res.json(updatedUser);
        }
    }
    catch (err) {
        res.json(err);
    }
};
const user_routes = (app) => {
    app.get('/', global_1.default, index);
    app.get('/show/:id', show);
    app.post('/create', create);
    app.get('/savings/:id', showSavings);
    app.post('/login', login);
    app.patch('/update/:id', update);
};
exports.default = user_routes;
