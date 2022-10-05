import express from 'express';
import commentSchema from '../schemas/comment.js';
const router = express.Router();

// 댓글 작성
router.post('/:_postId', (req, res, next) => {
    res.status(201).json({ message: '댓글 작성 성공' });
});

// 댓글 목록 가져오기
router.get('/:_postId', (req, res, next) => {
    res.status(200).json({ message: '댓글 목록 불러오기' });
});

// 댓글 수정하기
router.put('/:_commentId', (req, res, next) => {
    res.status(201).json({ message: '댓글 수정 성공' });
});

// 댓글 삭제
router.delete('/:_commentId', (req, res, next) => {
    res.sendStatus(204);
});

export default router;
