import express, {Request, Response} from 'express'
import { User, UserStore } from '../models/users'
import jwt, { JwtPayload } from 'jsonwebtoken'
import verifyAuthToken from '../middleware/global';

const secret = process.env.TOKEN_SECRET as string;
const store = new UserStore()

const index = async (req:Request, res: Response) => {
    const users = await store.index()
    res.json(users)
}

