"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const store = new user_1.UserStore();
const index = async (_req, res) => {
    const users = await store.index();
    res.json();
};
const show = async (req, res) => {
    const user = await store.show(req.params.id);
    res.json(user);
};
const create = async (req, res) => {
    try {
        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            balance: req.body.balance
        };
        const newUser = await store.create(user);
        res.json(newUser);
    }
    catch (err) {
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
};
const user_routes = (app) => {
    app.get('/', index),
        app.get('/show/:id', show),
        app.post('/create', create),
        app.delete('/delete', destroy);
};
exports.default = user_routes;
