const { model, Schema, ObjectId } = require('mongoose');

const mapSchema = new Schema(
    {
        _id: {
            type: ObjectId,
            required: true
        },
        name: {
            type: String,
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
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        },
        render_order: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        tags:{
            type: [String],
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
        tilesets:{
            type: [ObjectId],
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
        mapCreated: {
            type: Date,
            required: true
        },
        layers: {
           type: Array,
           required: true,
           default: []
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
        },
        usersDisliked: {
            type: [ObjectId],
            required: true
        }
    }
)

const Map = model('Map', mapSchema);
module.exports = Map;