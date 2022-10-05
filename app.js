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

// error 처리
app.use((error, req, res, next) => {
    console.log(error);
    res.status(404).json({ Error: '404 Not Found.' });
});

app.listen(port, (req, res, next) => {
    console.log(`Server start at ${port}.`);
});
