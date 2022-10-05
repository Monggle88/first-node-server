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
    res.status(404).json({
        ERROR: '404 Not Found.',
        links: {
            postList: 'GET /posts',
            writePost: 'POST /posts',
            viewPost: 'GET /posts/:_postId',
            revisePost: 'PUT /posts/:_postId',
            deletePost: 'DELETE /posts/:_postId',
            writeComment: 'POST /comments/:_postId',
            commentList: 'GET /comments/:_postId',
            reviseComment: 'PUT /comments/:_commentId',
            deleteComment: 'DELETE /comments/:_commentId',
        },
    });
});

app.listen(port, (req, res, next) => {
    console.log(`Server start at ${port}.`);
});
