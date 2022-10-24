import express from 'express';
import accounts from './api/account';
// import loans from './api/loans';

const routes = express.Router();

// Lets create our first server endpoint.
routes.get('/', (req, res)=> {
    console.log("Howdy, developer.")
    res.send("Server is working!!")
});

routes.use('/accounts', accounts);
// routes.use('/loans', loans);

export default routes;
