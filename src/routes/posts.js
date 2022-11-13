"use strict";
// Neu
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
// Require the post model
const Post = require('../models/post');
/* GET posts */
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // sort from the latest to the earliest
    const posts = yield Post.find().sort({ createdAt: 'desc' });
    return res.status(200).json({
        statusCode: 200,
        message: 'Fetched all posts',
        data: { posts },
    });
}));
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // req.params contains the route parameters and the id is one of them
    const post = yield Post.findById(req.params.id);
    return res.status(200).json({
        statusCode: 200,
        message: 'Fetched post',
        data: {
            post: post || {},
        },
    });
}));
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    yield post.save();
    return res.status(201).json({
        statusCode: 201,
        message: 'Created post',
        data: { post },
    });
}));
router.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, img, content, tags } = req.body;
    // findByIdAndUpdate accepts the post id as the first parameter and the new values as the second parameter
    const post = yield Post.findByIdAndUpdate(req.params.id, { title, author, img, content, tags });
    return res.status(200).json({
        statusCode: 200,
        message: 'Updated post',
        data: { post },
    });
}));
router.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Mongo stores the id as `_id` by default
    const result = yield Post.deleteOne({ _id: req.params.id });
    return res.status(200).json({
        statusCode: 200,
        message: `Deleted ${result.deletedCount} post(s)`,
        data: {},
    });
}));
exports.default = router;
