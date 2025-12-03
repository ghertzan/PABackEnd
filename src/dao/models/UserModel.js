import { Schema, model } from "mongoose";

const COLLECTION = "Users";

const userSchema = new Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["user", "admin", "guest"],
		default: "user",
	},
	adopted_pets: [
		{
			_id: false,
			pet_id: {
				type: Schema.Types.ObjectId,
				ref: "Pets",
			},
		},
	],
});

const userModel = model(COLLECTION, userSchema);
export default userModel;
