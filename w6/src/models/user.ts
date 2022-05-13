import client from "../database";
import bcrypt from 'bcrypt';

export type User = {
    id?: number;
    first_name: string;
    last_name: string;
    balance: number;
    email: string;
    password: string;

}


const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = process.env.SALT_ROUNDS as string;

export class UserStore {

    async index(): Promise<User[]> {
        try {
            const conn = await client.connect()
            const query = `SELECT * FROM users`
            const result = await conn.query(query)
            conn.release()
            return result.rows
        }
        catch (err) {
            throw new Error(`Cannot get users ${err}`)
        }
    }

    async show(id: string): Promise<User> {
        try {
            const conn = await client.connect()
            const query = `SELECT * FROM users where id='${id}'`
            const result = await conn.query(query)
            conn.release()
            return result.rows[0]
        }
        catch(err){
            throw new Error(`Cannot get user with id = ${id}. Error: ${err}`)
        }
    }

    async create(user: User): Promise<User> {
        try {
            const conn = await client.connect()
            // const query = `INSERT INTO users (first_name, last_name, balance) VALUES ('${user.first_name}', '${user.last_name}', ${user.balance}) RETURNING *`
            const query = 'INSERT INTO users (first_name, last_name, balance, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *'
            const hash = bcrypt.hashSync(user.password + pepper, parseInt(saltRounds));
            const result = await conn.query(query, [user.first_name, user.last_name, user.balance, user.email, hash])
            conn.release()
            return result.rows[0]

        }
        catch(err){
            throw new Error(`Cannot create user: ${err}`)
        }
    }

    async showSavings(id: string): Promise<User> {
        try {
            const conn = await client.connect();
            const query = `SELECT * FROM SAVINGS WHERE account='${id}'`
            const result = await conn.query(query)
            conn.release()
            return result.rows[0]
        }
        catch(err){
            throw new Error(`Cannot create user: ${err}`)
        }
    }

    async authenticate(email: string, password: string): Promise<User|null> {
        const conn = await client.connect();

        const sql = `SELECT * FROM users WHERE email = '${email}'`
        const result = await conn.query(sql);
        
        if (result.rows.length){
            // In case there is an email match, we need to authenticate that the password sent was correct.
            const user = result.rows[0]
            if (bcrypt.compareSync(password+pepper, user.password)){
                return user
            }
        }
        else{
            // User with email not found
            return null;
        }
        return null;
    }
}