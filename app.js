import express from 'express';
import morgan from 'morgan';

import dbConnection from './schemas/index.js';
import indexRouter from './routes/index.js';

const app = express();
const port = 3000;

dbConnection();

app.use(express.json());
app.use(morgan());

app.use(indexRouter);

app.listen(port, (req, res, next) => {
    console.log(`Server start at ${port}.`);
});
