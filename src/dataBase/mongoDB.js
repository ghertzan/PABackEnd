import mongoose from "mongoose";
import envs from "../config/envs.js";
import colors from "colors";

const initMongoDB = async (URL) => {
	try {
		await mongoose.connect(URL);
		console.log(colors.bgGreen.bold(`Mongo is ON!`));
	} catch (error) {
		throw new Error(error);
	}
};

export default initMongoDB;
