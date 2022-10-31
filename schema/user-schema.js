const { model, Schema, ObjectId } = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema(
    {
        _id: {
            type: ObjectId,
            required: true
        },
        userName: {
            type: String,
            required: true,
            unique: true
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
userSchema.plugin(uniqueValidator);

const User = model('User', userSchema);
module.exports = User;