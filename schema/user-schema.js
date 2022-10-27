const { model, Schema, ObjectId } = require('mongoose');

const userSchema = new Schema(
    {
        _id: {
            type: ObjectId,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        tilesets: {
            type: [ObjectId],
            required: true
        },
        shared_tilesets: {
            type: [ObjectId],
            required: true
        },
        maps: {
            type: [ObjectId],
            required: true
        },
        shared_maps: {
            type: [ObjectId],
            required: true
        },
        likes: {
            type: Number,
            required: true
        },
        dislikes: {
            type: Number,
            required: true
        },
        bio: {
            type: String,
            required: true
        },
        featured: {
            type: [ObjectId],
            required: true
        },
        accountCreated: {
            type: Date,
            required: true
        }
    }
)

const User = model('User', userSchema);
module.exports = User;