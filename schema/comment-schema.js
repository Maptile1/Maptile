const { model, Schema, ObjectId } = require('mongoose');

const commentSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		owner: {
			type: ObjectId,
			required: false
		},
		comment_text: {
			type: String,	
			required: true
		},
		comment_date: {
			type: Date,
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
		post: {
			type: ObjectId,
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
);

const Comment = model('Comment', commentSchema);
module.exports = Comment;