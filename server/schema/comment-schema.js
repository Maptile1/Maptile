const { model, Schema, ObjectId } = require('mongoose');

const commentSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		owner: {
			type: String,
			required: true
		},
		comment_text: {
			type: String,
			required: true
		},
		comment_date: {
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
        }
	}
);

const Comment = model('Comment', commentSchema);
module.exports = Comment;