"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { Schema } = mongoose_1.default;
const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    access: {
        type: String,
        enum: ["Basic", "Standard", "Premium"],
        required: true,
    },
});
exports.default = mongoose_1.default.model("Article", articleSchema);
