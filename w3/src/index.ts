import express from 'express';
import routes from './routes/index';

// First thing to do is to instantiate our Express object
// and set up an initial port to run our server on.
const app = express();
const port = 3000;

app.use('/api', express.json(), routes);

// App port listener.
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
