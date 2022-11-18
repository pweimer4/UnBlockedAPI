const express = require("express");
import authRoutes from "./routes/auth";
import subsRoutes from "./routes/subs";
import mongoose from "mongoose"
import dotenv = require("dotenv");
import cors = require("cors");
import articlesRoutes from "./routes/articles";
import postsRouter from "./routes/posts"
import coursesRouter from "./routes/courses"


dotenv.config();

mongoose.connect(
    process.env.MONGO_URI
)
.then(() => {
    console.log("Connected to Database");

    const app = express();
    
    app.use(express.json());
    app.use(cors());
    app.use("/auth", authRoutes);
    app.use("/subs", subsRoutes);
    app.use("/articles", articlesRoutes);

    app.use('/api/posts', postsRouter);
    app.use('/api/courses', coursesRouter)

    app.get("/", (req, res) => {
        res.send("Endlich!");
    });

    app.listen(1234, () => {
        console.log(`Server is running`)
    })
    
})
.catch((error) => {
    console.log({error});
    throw new Error(error)
})

 