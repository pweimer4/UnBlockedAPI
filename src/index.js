"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const authRoutes = require("./routes/auth");
const subs_1 = __importDefault(require("./routes/subs"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = require("dotenv");
const cors = require("cors");
const articles_1 = __importDefault(require("./routes/articles"));
const posts_1 = __importDefault(require("./routes/posts"));
dotenv.config();
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => {
    console.log("Connected to Database");
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use("/auth", authRoutes);
    app.use("/subs", subs_1.default);
    app.use("/articles", articles_1.default);
    app.use('/api/posts', posts_1.default);
    app.get("/", (req, res) => {
        res.send("Endlich!");
    });
    app.listen(process.env.PORT || 1234, () => {
        console.log("Server is running");
    });
})
    .catch((error) => {
    console.log({ error });
    throw new Error(error);
});
