const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    title2: {
        type: String,
        required: true,
      },
    imageUrl: {
        type: String
    },
    content: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
    },
    

})

module.exports = mongoose.model('Course', CourseSchema); 