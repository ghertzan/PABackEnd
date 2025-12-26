import { userService } from "../services/index.js";
import { petService } from "../services/index.js";
import { createHash } from "../utils/utils.js";
import colors from "colors";
import { faker } from "@faker-js/faker";

const getMockPets = (qty = 50) => {
	return Array.from({ length: qty }, () => ({
		_id: faker.database.mongodbObjectId(),
		name: faker.animal.petName(),
		species: faker.animal.type(),
		birthDate: faker.date.birthdate({ mode: "age", min: 1, max: 5 }),
		adopted: false,
	}));
};

const getMockUsers = (qty = 50) => {
	return Array.from({ length: qty }, () => ({
		_id: faker.database.mongodbObjectId(),
		first_name: faker.person.firstName(),
		last_name: faker.person.lastName(),
		email: faker.internet.email(),
		password: createHash("coder123"),
		role: faker.helpers.arrayElement(["user", "admin"]),
		adopted_pets: [],
	}));
};

const generatePets = (req, res) => {
	const { qty = 50 } = req.params;
	const fakePets = getMockPets(qty);
	res.send(fakePets);
};

const generateUsers = (req, res) => {
	const { qty = 50 } = req.params;
	const fakeUsers = getMockUsers(qty);
	res.send(fakeUsers);
};

const generateData = async (req, res) => {
	const { users, pets } = req.params;
	const toInsertUsers = getMockUsers(users);
	const toInsertPets = getMockPets(pets);

	try {
		await userService.insertMany(toInsertUsers);
		await petService.insertMany(toInsertPets);
	} catch (error) {
		res.status(500).json({ status: "ERROR", message: error.message });
	}

	res
		.status(200)
		.json({ status: "OK", message: "Fake data inserted successfully" });
};
export default {
	generatePets,
	generateUsers,
	generateData,
};
