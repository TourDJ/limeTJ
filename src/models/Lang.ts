import * as mongoose from "mongoose";

export type LangModel = mongoose.Document & {
    id: number,
    name: string,
    state: number
};

const langSchema = new mongoose.Schema({
    id: Number,
    name: String,
    state: Number
});

// static method

const Lang = mongoose.model("Lang", langSchema);
export default Lang;