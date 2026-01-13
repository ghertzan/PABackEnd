import mongoose from "mongoose";
import userDao from "../src/dao/UserDao.js";
import envs from "../src/config/envs.js";
import { expect } from "chai";

mongoose.connect(envs.DB_MONGO_ATLAS_URL);
