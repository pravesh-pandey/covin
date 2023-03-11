import mongoose from "mongoose";
const { Schema, model } = mongoose;
import Card from "./Card";

const bucket = new Schema({
	name: String,
	cards: [{ type: mongoose.Schema.Types.ObjectId, ref: Card }]
});

const Bucket = model("Bucket", bucket);

export default Bucket;