import mongoose from "mongoose";
const { Schema, model } = mongoose;

const card = new Schema({
	name: String,
	link: String,
});

const Card = model("Card", card);

export default Card;