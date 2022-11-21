const express = require("express");
const router = express.Router();
const Comment = require("../schema/comment-schema.js");
const ObjectId = require("mongodb").ObjectId;
const Tileset = require("../schema/tileset-schema");

// Comment Create
router.post("/comment/create", async (req, res) => {
  if (req.session._id == undefined){
    res.status(400).json({errorMessage: 'Not logged in'})
    return;
  }

  var comment = new Comment({
    _id: new ObjectId(),
    owner: req.session._id, 
    comment_text: req.body.comment_text,
    comment_date: new Date(),
    likes: 0,
    dislikes: 0,
    post: req.body.post,
    usersLiked: [],
    usersDisliked: []
  });
  await comment.save();
  var tileset = await Tileset.findOneAndUpdate(
    { _id: comment.post },
    { $addToSet: { comments: comment._id } },
    { new: true }
  );
  res.json({ payload: { comment: comment, tileset: tileset } });
});

// Comment update
router.post("/comment/update/:id", async (req, res) => {
  Comment.findById(req.params.id)
    .then((comment) => {
      comment.comment_text = req.body.comment_text || comment.comment_text;
      comment.likes = req.body.likes || comment.likes;
      comment.dislikes = req.body.dislikes || comment.dislikes;
      comment
        .save()
        .then(() => res.json("Comment updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get all comments from Tileset
router.get("/comment/:id", async (req, res) => {
  if (req.session._id == undefined){
    res.status(400).json({errorMessage: 'Not logged in'})
    return;
  }
  let tileset = await Tileset.findById(req.params.id);
  let comments = []  
  var comment;
  await Promise.all(
    tileset.comments.map(async (obj, index) => {
      comment = await Comment.findById(obj);
      comments.push(comment);
    })
  );
  res.json({comments: comments})
});

// Get Comment
// router.get("/comment/:id", async (req, res) => {
//   Comment.findById(req.params.id)
//     .then((comments) => res.json(comments))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// Get all comments
// router.get("/comment", async (req, res) => {
//   Comment.find()
//     .then((comments) => res.json(comments))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// Delete comment
router.post("/comment/delete/:id", async (req, res) => {
  Comment.findByIdAndDelete(req.params.id)
    .then(() => res.json("Comment deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/comment/like/:id", async (req, res) => {
  if (req.session._id == undefined) {
    res.status(400).json({ errorMessage: "Not logged in" });
    return;
  }
  if (req.body.like){
    var comment = await Comment.findOneAndUpdate(
      {_id: req.params.id, usersDisliked: {$in: [req.session._id]}},
      {$inc: {likes: 1, dislikes: -1}, $addToSet: { usersLiked: req.session._id },
      $pull: {usersDisliked: req.session._id}},
      {new: true})
    if (comment == null){
      comment = await Comment.findOneAndUpdate(
        {_id: req.params.id, usersLiked: {$nin: [req.session._id]}},
        {$inc: {likes: 1}, $addToSet: { usersLiked: req.session._id }},
        {new: true})
      if (comment == null){
        res.status(400).json({ errorMessage: "Could not find appropriate comment or have already liked" });
        return;
      }
    }
    res.json({ comment: comment });
  }
  else{
    var comment = await Comment.findOneAndUpdate(
      {_id: req.params.id, usersLiked: {$in: [req.session._id]}},
      {$inc: {likes: -1}, $pull: { usersLiked: req.session._id }},
      {new: true})
    if (comment == null){
      res.status(400).json({ errorMessage: "Could not find appropriate comment or have already unliked" });
        return;
    }
    else{
      res.json({ comment: comment });
    }
  }
})

router.post("/comment/dislike/:id", async (req, res) => {
  if (req.session._id == undefined) {
    res.status(400).json({ errorMessage: "Not logged in" });
    return;
  }
  if (req.body.dislike){
    var comment = await Comment.findOneAndUpdate(
      {_id: req.params.id, usersLiked: {$in: [req.session._id]}},
      {$inc: {likes: -1, dislikes: 1}, $addToSet: { usersDisliked: req.session._id },
      $pull: {usersLiked: req.session._id}},
      {new: true})
    if (comment == null){
      comment = await Comment.findOneAndUpdate(
        {_id: req.params.id, usersDisliked: {$nin: [req.session._id]}},
        {$inc: {dislikes: 1}, $addToSet: { usersDisliked: req.session._id }},
        {new: true})
      if (comment == null){
        res.status(400).json({ errorMessage: "Could not find appropriate comment or have already disliked" });
        return;
      }
    }
    res.json({ comment: comment });
  }
  else{
    var comment = await Comment.findOneAndUpdate(
      {_id: req.params.id, usersDisliked: {$in: [req.session._id]}},
      {$inc: {dislikes: -1}, $pull: { usersDisliked: req.session._id }},
      {new: true})
    if (comment == null){
      res.status(400).json({ errorMessage: "Could not find appropriate comment or have already undisliked" });
        return;
    }
    else{
      res.json({ comment: comment });
    }
  }
})


module.exports = router;
