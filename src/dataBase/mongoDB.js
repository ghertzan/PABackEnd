import mongoose from "mongoose";

import { logger } from "../utils/logger.js";

const initMongoDB = async (URL) => {
	try {
		await mongoose.connect(URL);
		logger.info(`Mongo is ON!`);
	} catch (error) {
		logger.error(`${error.message}`);
		throw new Error(error.message);
	}
};

export default initMongoDB;
