const express = require('express');
const router = express.Router();

const Course = require("../models/course");

router.get("/", async (req, res, next) => {
    const courses = await Course.find();
    return res.status(200).json({
        statusCode: 200,
        message: "Fetched all courses",
        data: {courses},
    })
})


router.get('/:id', async (req, res, next) => {
    // req.params contains the route parameters and the id is one of them
     const course = await Course.findById(req.params.id);
     return res.status(200).json({
       statusCode: 200,
       message: 'Fetched course',
       data: {
         course: course || {},
      },
   });
});

router.get('/:title2', async (req, res, next) => {
  // req.params contains the route parameters and the id is one of them
   const course = await Course.findById(req.params.title2);
   return res.status(200).json({
     statusCode: 200,
     message: 'Fetched post',
     data: {
       course: course || {},
    },
 });
});


router.post('/', async (req, res, next) => {
    const { title, title2, imageUrl, content } = req.body;
  
    // Create a new post
    const course = new Course({
      title,
      title2,
      imageUrl,
      content,
    });
  
    // Save the post into the DB
    await course.save();
    return res.status(201).json({
      statusCode: 201,
      message: 'Created course',
      data: { course },
  });
});


router.put('/:id', async (req, res, next) => {
    const { title, title2, imageUrl, content } = req.body;
  
    // findByIdAndUpdate accepts the post id as the first parameter and the new values as the second parameter
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { title, title2, imageUrl, content },
    );
    
    return res.status(200).json({
      statusCode: 200,
      message: 'Updated course',
      data: { course },
 });
});


  router.delete('/:id', async (req, res, next) => {
    // Mongo stores the id as `_id` by default
    const result = await Course.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      statusCode: 200,
      message: `Deleted ${result.deletedCount} course(s)`,
      data: {},
  });
});


export default router;