import * as mongoose from 'mongoose' 

export type BlogModel = mongoose.Document & {
    title: string,
    article: string,
    createDate: Date,
    creator: string,
    labels: LangLabels[]
}

export type LangLabels = {
    leve: number,
    name: string
}

const blogSchema = new mongoose.Schema({
    title: String,
    article: String,
    createDate: Date,
    creator: String,
    labels: Array
})


// export blog model
const Blog  = mongoose.model('blog', blogSchema)
export default Blog