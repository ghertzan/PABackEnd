import mongoose from "mongoose";
import userDao from "../src/dao/UserDao.js";
import envs from "../src/config/envs.js";
import { expect } from "chai";
import { faker } from "@faker-js/faker";

mongoose.connect(envs.DB_MONGO_ATLAS_URL);

describe("Test UserDao, funciones:", function () {
	it("getAll, debe devolver un array", async () => {
		const result = await userDao.getAll();
		expect(result).to.be.an("array");
	});
	it("create, agrega correctamente un usuario a la base de datos", async () => {
		let mockUser = {
			first_name: faker.person.firstName(),
			last_name: faker.person.lastName(),
			email: faker.internet.email(),
			password: "1234",
			role: faker.helpers.arrayElement(["user", "admin"]),
			adopted_pets: [],
		};
		const result = await userDao.create(mockUser);
		expect(result).to.be.ok;
	});
	it("create: al agregar un documento a la DB las mascotas adoptadas es un array vacío por default", async () => {
		let mockUser = {
			first_name: faker.person.firstName(),
			last_name: faker.person.lastName(),
			email: faker.internet.email(),
			password: "1234",
			role: faker.helpers.arrayElement(["user", "admin"]),
		};
		const result = await userDao.create(mockUser);
		expect(result.adopted_pets).to.be.empty;
	});
	it("getByEmail: el Dao puede obtener un usuario por su email", async () => {
		let mockUser = {
			first_name: faker.person.firstName(),
			last_name: faker.person.lastName(),
			email: faker.internet.email(),
			password: "1234",
			role: faker.helpers.arrayElement(["user", "admin"]),
		};
		const user = await userDao.create(mockUser);
		const result = await userDao.getByEmail(user.email);
		expect(result._id.toString()).to.be.equal(user._id.toString());
	});
});
