import express from 'express';
import commentSchema from '../schemas/comment.js';
const router = express.Router();

// 댓글 작성
router.post('/:_postId', async (req, res, next) => {
    try {
        const _postId = req.params._postId;
        const { user, password, content } = req.body;
        if (content) {
            await commentSchema.create({ _postId, user, password, content });
            res.status(201).json({ message: '댓글 작성 성공' });
        } else {
            res.status(400).json({ message: '내용을 입력해 주세요' });
        }
    } catch (error) {
        return next(error);
    }
});

// 댓글 목록 가져오기
router.get('/:_postId', async (req, res, next) => {
    try {
        const targetId = req.params._postId;
        const coments = await commentSchema
            .find({ targetId })
            .sort({ createdAt: 'desc' });
        const data = coments.map((coment) => {
            return {
                comentId: coment._id,
                user: coment.user,
                content: coment.content,
                createdAt: coment.createdAt,
            };
        });
        res.status(200).json(data);
    } catch (error) {
        return next(error);
    }
});

// 댓글 수정하기
router.put('/:_commentId', async (req, res, next) => {
    try {
        const targetId = req.params._commentId;
        const { password, content } = req.body;
        if (content.length === 0) {
            return res
                .status(400)
                .json({ message: 'Error! 내용을 입력해 주세요' });
        }
        const newContent = await commentSchema.updateOne(
            {
                id: targetId,
                password: password,
            },
            { $set: { content } },
        );
        if (newContent.matchedCount === 0) {
            return res.status(400).json({ message: 'Error! 비밀번호 오류' });
        }
        res.json({ message: '댓글 수정 성공' });
    } catch (error) {
        return next(error);
    }
});

// 댓글 삭제
router.delete('/:_commentId', async (req, res, next) => {
    try {
        const targetId = req.params._commentId;
        const inputPassword = req.body.password;
        const targetComment = await commentSchema.findOne({
            _id: targetId,
            password: inputPassword,
        });
        console.log(targetComment);
        if (targetComment) {
            await commentSchema.deleteOne({ _id: targetComment._id });
        } else {
            return res
                .status(400)
                .json({
                    sucess: false,
                    message: 'Error! 댓글id/비빌번호 오류',
                });
        }
        res.status(200).send({ message: '댓글 삭제 성공' });
    } catch (error) {
        return next(error);
    }
});

export default router;
