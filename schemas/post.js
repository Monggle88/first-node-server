import mongoose from 'mongoose';

const postsSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

export default mongoose.model('posts', postsSchema);
