const { model, Schema, ObjectId } = require('mongoose');

const tilesetSchema = new Schema(
    {
        _id: {
            type: ObjectId,
            required: true
        },
        tileset_data: {
            type: [Object],
            required: true
        },
        tile_width: {
            type: Number,
            required: true
        },
        tile_height: {
            type: Number,
            required: true
        },
        tileset_width: {
            type: Number,
            required: true
        },
        tileset_height: {
            type: Number,
            required: true
        },
        tags: {
            type: [String],
            required: true
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
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
        comments: {
            type: [ObjectId],
            required: true
        },
        public: {
            type: Boolean,
            required: true
        },
        tilesetCreated: {
            type: Date,
            required: true
        },
        owner: {
            type: String,
            required: true
        },
        timeEdited: {
            type: Date,
            required: true
        },
        usersLiked: {
            type: [ObjectId],
            required: true
        }
    }
)

const TileSet = model('TileSet', tilesetSchema);
module.exports = TileSet;