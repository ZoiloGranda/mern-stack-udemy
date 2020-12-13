const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model('Post')
const fetch = require('node-fetch');
const {CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET} = require('../config/keys');

router.get('/allpost', requireLogin, (req, res) => {
 Post.find()
  .populate('postedBy', '_id name')
  .populate('comments.postedBy', '_id name')
  .sort('-createdAt')
  .then(posts => {
   res.json({ posts })
  })
  .catch(err => {
   console.log(err);
  })
})

router.get('/getsubpost', requireLogin, (req, res) => {
 Post.find({ postedBy: { $in: req.user.following } })
  .populate('postedBy', '_id name')
  .populate('comments.postedBy', '_id name')
  .sort('-createdAt')
  .then(posts => {
   res.json({ posts })
  })
  .catch(err => {
   console.log(err);
  })
})

router.post('/createpost', requireLogin, (req, res) => {
 const { title, body, pic } = req.body;
 if (!title || !body || !pic) {
  return res.status(422).json({ error: 'Please add all fields' })
 }
 req.user.password = undefined;
 const post = new Post({
  title,
  body,
  photo: pic,
  postedBy: req.user
 })
 post.save().then(result => {
   res.json({ post: result })
  })
  .catch(err => {
   console.log(err)
  })
})

router.get('/mypost', requireLogin, (req, res) => {
 Post.find({ postedBy: req.user._id })
  .populate('postedBy', '_id name')
  .then(mypost => {
   res.json({ mypost })
  })
  .catch(err => {
   console.log(err);
  })
})

router.put('/like', requireLogin, (req, res) => {
 Post.findByIdAndUpdate(req.body.postId, {
   $push: { likes: req.user._id }
  }, {
   new: true
  })
  .populate('comments.postedBy', '_id name')
  .exec((err, result) => {
   if (err) {
    return res.status(422).json({ error: err })
   } else {
    res.json(result)
   }
  })
})

router.put('/unlike', requireLogin, (req, res) => {
 Post.findByIdAndUpdate(req.body.postId, {
   $pull: { likes: req.user._id }
  }, {
   new: true
  })
  .populate('comments.postedBy', '_id name')
  .exec((err, result) => {
   if (err) {
    return res.status(422).json({ error: err })
   } else {
    res.json(result)
   }
  })
})

router.put('/comment', requireLogin, (req, res) => {
 const comment = {
  text: req.body.text,
  postedBy: req.user._id
 }
 Post.findByIdAndUpdate(req.body.postId, {
   $push: { comments: comment }
  }, {
   new: true
  })
  .populate('comments.postedBy', '_id name')
  .populate('postedBy', '_id name')
  .exec((err, result) => {
   if (err) {
    return res.status(422).json({ error: err })
   } else {
    res.json(result)
   }
  })
})

router.delete('/deletecomment', requireLogin, (req, res) => {
 Post.findByIdAndUpdate(req.body.postId, {
   $pull: { comments: { _id: req.body.commentId } }
  }, {
   new: true
  })
  .populate('comments.postedBy', '_id name')
  .exec((err, result) => {
   if (err) {
    console.log(err);
    return res.status(422).json({ error: err })
   } else {
    res.json(result)
   }
  })
})

router.delete('/deletepost/:postId', requireLogin, async (req, res) => {
 Post.findOne({ _id: req.params.postId })
  .populate('postedBy', '._id')
  .exec(async (err, post) => {
   if (err || !post) {
    return res.status(422).json({ error: err })
   }
   if (post.postedBy._id.toString() === req.user._id.toString()) {
    await removePhoto(post.photo.split("/").pop())
    post.remove()
     .then(result => {
      res.json(result)
     }).catch(err => {
      console.log(err);
     })
   }
  })
})

function removePhoto(photoName) {
 const photoId = photoName.substring(0, photoName.lastIndexOf('.'));
 return fetch(`https://${CLOUD_API_KEY}:${CLOUD_API_SECRET}@api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image/upload`, {
  body: `public_ids[]=${photoId}`,
  headers: {
   "Content-Type": "application/x-www-form-urlencoded"
  },
  method: "DELETE"
 }).then(result=> result.json())
}

module.exports = router