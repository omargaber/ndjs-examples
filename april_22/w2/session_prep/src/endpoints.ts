import express from 'express';

const app = express();
const port = 5000;


app.get('/api', (req, res)=> {
    res.send("Hello world!");
})

app.listen(port, ()=>console.log(`Listening on port ${port}.`));

export default app;