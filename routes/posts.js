import express from 'express';
import postSchema from '../schemas/post.js';
const router = express.Router();

// 게시글 작성
router.post('/', (req, res, next) => {
    res.status(201).json({ message: '게시글 작성 성공' });
});

// 게시글 목록 조회 (내림차순)

// 게시글 상세 조회

// 게시글 수정 (비밀번호 확인)

// 게시글 삭제 (비밀번호 확인)

export default router;
