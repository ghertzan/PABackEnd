import UserDto from "../src/dto/UserDto.js";
import { describe } from "mocha";
import { expect } from "chai";
import { faker } from "@faker-js/faker";

describe("Data Transfer Object, DTO del usuario:\n Como se concatena el nombre:", function () {
	it("getUserDto, devuelve una propiedad name que contiene el apellido y nombre concatenado en la propiedad y elimina las propiedades que no quiero que se vean:", () => {
		const user = {
			first_name: faker.person.firstName(),
			last_name: faker.person.lastName(),
			email: faker.internet.email(),
			password: "1234",
			role: faker.helpers.arrayElement(["user", "admin"]),
		};

		const result = UserDto.getUserDto(user);
		expect(result.name).to.be.equal(`${user.last_name}, ${user.first_name}`);
		expect(result).not.to.have.property("password");
		expect(result).not.to.have.property("first_name");
		expect(result).not.to.have.property("last_name");
	});
});
