"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
class UserStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const query = `SELECT * FROM users`;
            const result = await conn.query(query);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get users ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const query = `SELECT * FROM users where id='${id}'`;
            const result = await conn.query(query);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot get user with id = ${id}. Error: ${err}`);
        }
    }
    async create(user) {
        try {
            const conn = await database_1.default.connect();
            // const query = `INSERT INTO users (first_name, last_name, balance) VALUES ('${user.first_name}', '${user.last_name}', ${user.balance}) RETURNING *`
            const query = 'INSERT INTO users (first_name, last_name, balance, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *';
            const hash = bcrypt_1.default.hashSync(user.password + pepper, parseInt(saltRounds));
            const result = await conn.query(query, [user.first_name, user.last_name, user.balance, user.email, hash]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot create user: ${err}`);
        }
    }
    async showSavings(id) {
        try {
            const conn = await database_1.default.connect();
            const query = `SELECT * FROM SAVINGS WHERE account='${id}'`;
            const result = await conn.query(query);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot create user: ${err}`);
        }
    }
    async authenticate(email, password) {
        const conn = await database_1.default.connect();
        const sql = `SELECT * FROM users WHERE email = '${email}'`;
        const result = await conn.query(sql);
        if (result.rows.length) {
            // In case there is an email match, we need to authenticate that the password sent was correct.
            const user = result.rows[0];
            if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                return user;
            }
        }
        else {
            // User with email not found
            return null;
        }
        return null;
    }
    async update(user, values) {
        const conn = await database_1.default.connect();
        let f_name, l_name;
        let balance;
        if (values.first_name) {
            f_name = values.first_name;
        }
        else {
            f_name = null;
        }
        if (values.last_name) {
            l_name = values.last_name;
        }
        else {
            l_name = null;
        }
        if (values.balance) {
            balance = values.balance;
        }
        else {
            balance = null;
        }
        const query = `UPDATE users SET first_name = COALESCE($1, first_name), last_name=COALESCE($2, last_name), balance=COALESCE($3, balance) where id=${user.id} RETURNING *`;
        const result = await database_1.default.query(query, [f_name, l_name, balance]);
        conn.release();
        return result.rows[0];
    }
}
exports.UserStore = UserStore;
