import mongoose from 'mongoose';

const commentsSchema = new mongoose.Schema({
    _postId: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    content: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
});

export default mongoose.model('comments', commentsSchema);
