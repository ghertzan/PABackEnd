import { Schema, model } from "mongoose";

const COLLECTION = "Pets";

const petSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		species: {
			type: String,
			required: true,
		},
		birthDate: Date,
		adopted: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "Users",
			default: null,
		},
		image: {
			type: String,
		},
	},
	{ timestamps: true }
);

const petModel = model(COLLECTION, petSchema);
export default petModel;
