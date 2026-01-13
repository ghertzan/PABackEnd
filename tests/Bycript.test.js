import { describe } from "mocha";
import { expect } from "chai";
import { faker } from "@faker-js/faker";
import { createHash, isValidPassword } from "../src/utils/utils.js";

describe("Hash: Efectividad del hashing de contraseñas:", function () {
	it("El hashing es efectivo, se espera que la contraseña sea diferente al hash.", () => {
		const password = faker.internet.password({ length: 8 });
		const result = createHash(password);
		expect(result).to.not.equal(password);
	});
	it("La contraseña debe poder compararse usando el hash. Se espera que la comparación del hash con la contraseña sea true", () => {
		const password = faker.internet.password({ length: 8 });
		const hash = createHash(password);
		const result = isValidPassword(password, hash);
		expect(result).to.be.ok;
	});

	it("Una vez creado el hash de la contraseña, si esta se ve alterada, la comparación con la contraseña debe ser falso", () => {
		const password = faker.internet.password({ length: 8 });
		let hash = createHash(password);
		hash = hash + "3";
		const result = isValidPassword(password, hash);
		expect(result).to.be.false;
	});
});
