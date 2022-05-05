import client from "../database";

export type User = {
    id?: number;
    first_name: string;
    last_name: string;
    balance: number

}

export class UserStore {

    async index(): Promise<User[]> {
        try{
            const conn = await client.connect();
            const query = 'SELECT * FROM users'
            const result = await conn.query(query)
            conn.release()
            return result.rows
        }
        catch (err) {
            throw new Error(`Cannot get users ${err}`)
        }
    }

    async show(id: string): Promise<User> {
        try{
            const conn = await client.connect();
            const query = `SELECT * FROM users where id=${id}`
            // const query = 'SELECT * FROM users where id=($1)'
            // const result = await conn.query(query, [id])
            const result = await conn.query(query)
            conn.release()
            return result.rows[0]
        }
        catch(err){
            throw new Error(`Cannot get user with id ${id}. Error: ${err}`)
        }
    }

    async create(user: User): Promise<User> {
        try{
            const conn = await client.connect();
            // const query = `INSERT INTO users (first_name, last_name, balance) VALUES ('${user.first_name}', '${user.last_name}', ${user.balance}) RETURNING *`
            const query = 'INSERT INTO users (first_name, last_name, balance) VALUES($1, $2, $3) RETURNING *'
            const result = await conn.query(query, [user.first_name, user.last_name, user.balance])
            // const result = await conn.query(query)
            conn.release()
            return result.rows[0]
        }
        catch(err){
            throw new Error(`Cannot create user. Error: ${err}`)
        }
    }


    async delete(id: string): Promise<User> {
        try{
            const conn = await client.connect();
            const query = `DELETE FROM users WHERE id=${id}`
            // const query = 'DELETE FROM books WHERE id=($1)'
            // const result = await conn.query(query, [id])
            const result = await conn.query(query)
            conn.release()
            return result.rows[0]
        }
        catch(err){
            throw new Error(`Cannot delete user ${id}. Error: ${err}`)
        }
    }
}