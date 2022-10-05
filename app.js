import express from 'express';
import morgan from 'morgan';

import dbConnection from './schemas/index.js';
import indexRouter from './routes/index.js';

const app = express();
const port = 3000;

dbConnection();

app.use(express.json());
app.use(morgan('tiny'));

app.use(indexRouter);

// Error 처리
app.use((req, res, next) => {
    res.sendStatus(404);
});

app.use((error, req, res, next) => {
    console.log(error);
    res.sendStatus(500);
});

app.listen(port, (req, res, next) => {
    console.log(`Server start at ${port}.`);
});
