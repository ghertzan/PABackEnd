import { faker } from "@faker-js/faker";
import userDao from "./dao/UserDao.js";
import petDao from "./dao/PetDao.js";
import initMongoDB from "./dataBase/mongoDB.js";
import { createHash } from "./utils/utils.js";

initMongoDB();
function createFakeUsers(n) {
	const userToAdd = [];

	for (let i = 0; i < n; i++) {
		const fakeUser = {
			first_name: faker.person.firstName(),
			last_name: faker.person.lastName(),
			email: faker.internet.email(),
			password: createHash(faker.internet.password()),
			role: faker.helpers.arrayElement(["user", "guest"]),
			adopted_pets: [],
		};

		userToAdd.push(fakeUser);
	}
	return userToAdd;
}

function createFakePets(n) {
	const petsToAdd = [];

	for (let i = 0; i < n; i++) {
		const fakePet = {
			name: faker.animal.petName(),
			species: faker.helpers.arrayElement(["cat", "dog"]),
			birthDate: faker.date.birthdate({ mode: "age", min: 1, max: 3 }),
			adopted: false,
			owner: null,
			image: faker.image.avatar(),
		};
		petsToAdd.push(fakePet);
	}
	return petsToAdd;
}

// const u = createFakeUsers(15);

// for (let i = 0; i < u.length; i++) {
// 	await userDao.create(u[i]).then((user) => console.log(user));
// }

// const p = createFakePets(35);

// for (let i = 0; i < p.length; i++) {
// 	await petDao.create(p[i]).then((pet) => console.log(pet));
// }
