import express from 'express';
import postSchema from '../schemas/post.js';
const router = express.Router();

// 게시글 목록 조회 (내림차순)
router.get('/', (req, res, next) => {
    res.status(200).json({ message: '게시글 목록 불러오기' });
});

// 게시글 작성
router.post('/', (req, res, next) => {
    res.status(201).json({ message: '게시글 작성 성공' });
});

// 게시글 상세 조회
router.get('/:_postId', (req, res, next) => {
    res.status(200).json({ message: '게시글 상세 조회' });
});

// 게시글 수정 (비밀번호 확인)
router.put('/:_postId', (req, res, next) => {
    res.status(201).json({ message: '게시글 수정 성공' });
});

// 게시글 삭제 (비밀번호 확인)
router.delete('/:_postId', (req, res, next) => {
    res.sendStatus(204);
});

export default router;
