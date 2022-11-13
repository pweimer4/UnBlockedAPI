// Neu


const express = require('express');
const router = express.Router();
// Require the post model
const Post = require('../models/post'); 

/* GET posts */
router.get('/', async (req, res, next) => { 
  // sort from the latest to the earliest
  const posts = await Post.find().sort({ createdAt: 'desc' });
  return res.status(200).json({
    statusCode: 200,
    message: 'Fetched all posts',
    data: { posts },
  });
});


router.get('/:id', async (req, res, next) => {
    // req.params contains the route parameters and the id is one of them
     const post = await Post.findById(req.params.id);
     return res.status(200).json({
       statusCode: 200,
       message: 'Fetched post',
       data: {
         post: post || {},
      },
   });
});


router.post('/', async (req, res, next) => {
    const { title, author, img, content, tags } = req.body;
  
    // Create a new post
    const post = new Post({
      title,
      author,
      img, 
      content,
      tags,
    });
  
    // Save the post into the DB
    await post.save();
    return res.status(201).json({
      statusCode: 201,
      message: 'Created post',
      data: { post },
  });
});


router.put('/:id', async (req, res, next) => {
    const { title, author, img, content, tags } = req.body;
  
    // findByIdAndUpdate accepts the post id as the first parameter and the new values as the second parameter
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, author, img, content, tags },
    );
    
    return res.status(200).json({
      statusCode: 200,
      message: 'Updated post',
      data: { post },
 });
});


  router.delete('/:id', async (req, res, next) => {
    // Mongo stores the id as `_id` by default
    const result = await Post.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      statusCode: 200,
      message: `Deleted ${result.deletedCount} post(s)`,
      data: {},
  });
});


export default router;