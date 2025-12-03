import { Schema, model } from "mongoose";

const COLLECTION = "Adoptions";

const adoptionSchema = new Schema({
	pet_id: {
		_id: false,
		type: Schema.Types.ObjectId,
		ref: "Pets",
		required: true,
	},
	owner_user_id: {
		_id: false,
		type: Schema.Types.ObjectId,
		ref: "Users",
		required: true,
	},
});

const adoptionModel = model(COLLECTION, adoptionSchema);
export default adoptionModel;
