"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_1 = require("./routes/auth");
const subs_1 = require("./routes/subs");
const mongoose_1 = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const articles_1 = require("./routes/articles");
const posts_1 = require("./routes/posts");
dotenv.config();
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => {
    console.log("Connected to Database");
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use("/auth", auth_1.default);
    app.use("/subs", subs_1.default);
    app.use("/articles", articles_1.default);
    app.use('/api/posts', posts_1.default);
    app.get("/", (req, res) => {
        res.send("Endlich!");
    });
    app.listen(1234, () => {
        console.log("Server is running");
    });
})
    .catch((error) => {
    console.log({ error });
    throw new Error(error);
});
