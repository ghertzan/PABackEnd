import { expect } from "chai";
import supertest from "supertest";
import { faker } from "@faker-js/faker";

const requester = supertest("http://localhost:8080");

describe("Test de Integración para Usuarios", function () {
	describe("API de Usuarios", function () {
		it("EndPoint GET /api/users, para obtener los usuarios, debe ser un array", async () => {
			const { _body } = await requester.get("/api/users");
			expect(_body.payload).to.be.an("array");
		});
		it("EndPoint GET /api/users/:uid, Debe devolver el usuario cuyo ID paso en la URL", async () => {
			const uid = "6ce4d364d1438b5b8dc1a5e7";
			const { _body } = await requester.get(`/api/users/${uid}`);
			expect(_body.payload._id).to.be.equal(uid);
		});
	});

	describe("Test para las Sessiones", function () {
		it("EndPoint POST /api/session/register, Debe crear un usuario nuevo, la respuesta es correcta, Lo que devuelve es el ID del usuario creado y debe ser de tipo ObjectID de MongoDB. El campo password no debe estar en la respuesta", async () => {
			let mockUser = {
				first_name: faker.person.firstName(),
				last_name: faker.person.lastName(),
				email: faker.internet.email(),
				password: "1234",
				role: faker.helpers.arrayElement(["user", "admin"]),
				adopted_pets: [],
			};
			const { _body } = await requester
				.post("/api/session/register")
				.send(mockUser);
			expect(_body.payload).to.be.ok;
			expect(_body.message).to.be.equal("User Created");
			expect(_body.payload).to.match(/^[0-9a-fA-F]{24}$/);
			expect(_body.payload).to.have.not.property("password");
		});

		it("EndPoint POST /api/session/login, Permite a un usuario mediante su email y password iniciar sesion, el end point devuelve un status 200 y un a cookie con el token", async () => {
			let mockUser = {
				email: "Hazel7@gmail.com",
				password: "coder123",
			};
			const result = await requester.post("/api/session/login").send(mockUser);
			const cookie = result.headers["set-cookie"][0];
			expect(cookie).to.be.ok;
			expect(cookie).to.have.string("authCookie=");
		});
	});
});
