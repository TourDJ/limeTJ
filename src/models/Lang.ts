import * as mongoose from "mongoose";

export type LangModel = mongoose.Document & {
    id: number,
    name: string,
    state: string
};

const langSchema = new mongoose.Schema({
    id: Number,
    name: String,
    state: String
});

langSchema.statics.fetch = function(cb: any) {
    return this
        .find()
        .exec(cb);
};

langSchema.statics.findById = function(id: Number, cb: any) {
    return this
        .findOne({_id: id})
        .exec(cb);
};

const Lang = mongoose.model("Lang", langSchema);
export default Lang;