const { model, Schema, ObjectId } = require('mongoose');

const tilesetSchema = new Schema(
    {
        tilesetId: {
            type: ObjectId,
            required: true
        },
        tiles: {
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
        comments:{
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
        }
    }
)

const TileSet = model('TileSet', tilesetSchema);
module.exports = TileSet;