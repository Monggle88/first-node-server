import express from 'express';
import postSchema from '../schemas/post.js';
const router = express.Router();

// 게시글 목록 조회 (내림차순)
router.get('/', async (req, res, next) => {
    try {
        const posts = await postSchema.find().sort({ createdAt: 'desc' }); // 내림차순
        const post = posts.map((post) => {
            // 필요한 값만 찾아 post에 할당
            return {
                postId: post._id,
                user: post.user,
                title: post.title,
                createdAt: post.createdAt,
            };
        });
        res.status(200).json(post);
    } catch (error) {
        return next(error);
    }
});

// 게시글 작성
router.post('/', async (req, res, next) => {
    try {
        const { user, password, title, content } = req.body;
        await postSchema.create({ user, password, title, content });
        res.status(201).json({ message: '게시글 작성 성공' });
    } catch (error) {
        return next(error);
    }
});

// 게시글 상세 조회
router.get('/:_postId', async (req, res, next) => {
    try {
        const targetId = req.params._postId;
        const post = await postSchema.findOne({ _id: targetId });
        const targetPost = {
            postId: post._id,
            user: post.user,
            title: post.title,
            content: post.content,
            createdAt: post.createdAt,
        };
        res.status(200).json(targetPost);
    } catch (error) {
        return next(error);
    }
});

// 게시글 수정 (비밀번호 확인)
router.put('/:_postId', async (req, res, next) => {
    try {
        const targetId = req.params._postId;
        const { password, title, content } = req.body;
        const targetPost = await postSchema.findOne({ _id: targetId });
        if (targetPost.password === password) {
            await postSchema.updateOne(
                { _id: targetId },
                { $set: { title, content } },
            );
        } else {
            return res.status(400).json({
                success: false,
                message: 'Error! 비밀번호 불일치',
            });
        }
        res.status(201).json({
            message: '게시글이 성공적으로 수정되었습니다.',
        });
    } catch (error) {
        return next(error);
    }
});

// 게시글 삭제 (비밀번호 확인)
router.delete('/:_postId', async (req, res, next) => {
    try {
        const targetId = req.params._postId;
        const inputPassword = req.body.password;
        const targetPost = await postSchema.findOne({ _id: targetId });
        if (targetPost.password === inputPassword) {
            await postSchema.deleteOne({ _id: targetId });
        } else {
            return res
                .status(400)
                .json({ success: false, message: 'Error! 비밀번호 불일치' });
        }
        res.status(201).json({
            message: '게시글이 성공적으로 삭제되었습니다.',
        });
    } catch (error) {
        return next(error);
    }
});

export default router;
