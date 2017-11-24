import * as mongoose from "mongoose";
import LangLabel from "./Lang";

export type BlogModel = mongoose.Document & {
    title: string,
    article: string,
    createDate: Date,
    creator: string,
    labels: Array<String>,
    open: number,
    catalog: number,
    cntRead: number,
    cntComment: number,
    langName: Array<String>
};

const blogSchema = new mongoose.Schema({
    title: String,
    article: String,
    createDate: Date,
    creator: String,
    labels: String,
    open: Number,
    catalog: Number,
    cntRead: Number,
    cntComment: Number
}, { timestamps: true });



// export blog model
const Blog  = mongoose.model("Blog", blogSchema);
export default Blog;