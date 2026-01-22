import mongoose from "mongoose";
import apdoptionDao from "../src/dao/AdoptionDao.js";
import envs from "../src/config/envs.js";
import { expect } from "chai";
import { faker } from "@faker-js/faker";

mongoose.connect(envs.DB_MONGO_TEST);

describe("Tests para el DAO de Adopciones", function () {
	it("getAllAdoptions, debe devolver un array", async () => {
		const result = await apdoptionDao.getAll();
		expect(result).to.be.an("array");
	});
});
