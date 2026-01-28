import mongoose from "mongoose";
import envs from "../config/envs.js";
import colors from "colors";
import { logger } from "../utils/logger.js";

const initMongoDB = async (URL) => {
	try {
		await mongoose.connect(URL);
		logger.info(`Mongo is ON!`);
	} catch (error) {
		logger.error(`${error.message}`);
		throw new Error(error);
	}
};

export default initMongoDB;
