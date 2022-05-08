import express, {Request, Response} from 'express'
import { User, UserStore } from '../models/user'

const store = new UserStore()


const index = async (_req: Request, res: Response)=> {
    const users = await store.index()
    res.json();
}

const show = async (req:Request, res: Response) => {
    const user = await store.show(req.params.id)
    res.json(user);
}

const create = async (req:Request, res:Response) => {
    try {
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            balance: req.body.balance
        }
        const newUser = await store.create(user)
        res.json(newUser)
    }
    catch (err) {
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const user_routes = (app: express.Application) => {
    app.get('/', index),
    app.get('/show/:id', show),
    app.post('/create', create),
    app.delete('/delete', destroy)
}

export default user_routes