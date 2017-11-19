import * as mongoose from "mongoose";

export type LangModel = mongoose.Document & {
    langId: number,
    langName: string,
    state: number
};

const langSchema = new mongoose.Schema({
    langId: Number,
    langName: String,
    state: Number
});

// static method

const Lang = mongoose.model("Lang", langSchema);
export default Lang;