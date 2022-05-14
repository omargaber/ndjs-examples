"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const store = new user_1.UserStore();
const index = async (req, res) => {
    const users = await store.index();
    res.json(users);
};
const show = async (req, res) => {
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
    res.json(newUser);
};
const showSavings = async (req, res) => {
    const savings = await store.showSavings(req.params.id);
    res.json(savings);
};
const user_routes = (app) => {
    app.get('/', index);
    app.get('/show/:id', show);
    app.post('/create', create);
    app.get('/savings/:id', showSavings);
};
exports.default = user_routes;
