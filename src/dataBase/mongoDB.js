import mongoose from "mongoose";
import envs from "../config/envs.js";
import colors from "colors";

const initMongoDB = async () => {
	try {
		await mongoose.connect(envs.DB_MONGO_ATLAS_URL);
		console.log(colors.bgGreen.bold(`Mongo is ON!`));
	} catch (error) {
		throw new Error(error);
	}
};

export default initMongoDB;
