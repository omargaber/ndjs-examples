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
}