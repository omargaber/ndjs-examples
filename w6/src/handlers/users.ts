import express, {Request, Response} from 'express'
import { User, UserStore } from '../models/user'

const store = new UserStore()

const index = async (req:Request, res: Response) => {
    const users = await store.index()
    res.json(users)
}

const show = async (req:Request, res: Response) => {
    const user = await store.show(req.params.id)
    res.json(user)
}

const create = async (req: Request, res: Response)=> {
    const user: User = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        balance: req.body.balance,
        email: req.body.email,
        password: req.body.password
    }

    const newUser = await store.create(user)
    res.json(newUser)
}

const showSavings = async (req: Request, res: Response)=> {
    const savings = await store.showSavings(req.params.id)
    res.json(savings)
}

const login = async (req: Request, res: Response)=> {
    const userAuth = await store.authenticate(req.body.email, req.body.password)
    res.json(userAuth)
}

const user_routes = (app: express.Application) => {
    app.get('/', index)
    app.get('/show/:id', show)
    app.post('/create', create)
    app.get('/savings/:id', showSavings)
    app.post('/login', login);
}

export default user_routes