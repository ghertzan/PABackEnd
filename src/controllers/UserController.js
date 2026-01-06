import UserDto from "../dto/UserDto.js";
import { userService } from "../services/index.js";
import { createHash } from "../utils/utils.js";

const createUser = async (req, res) => {
	const { first_name, last_name, email, age, role, password } = req.body;
	try {
		const userFound = userService.getByEmail(email);
		if (!userFound) {
			return res
				.status(400)
				.json({ status: "Error", message: `${email}, already used` });
		}
		const newUser = {
			first_name,
			last_name,
			email,
			password: createHash(password),
			role,
			adoptedPets: [],
		};
		const user = await userService.create(newUser);
		res.status(200).json({ message: "User Created", payload: user._id });
	} catch (error) {
		res.status(500).json({
			message: "Unable to create... see the error log.",
			error: error.message,
		});
	}
};

const getUserByEmail = async (req, res) => {
	const { email } = req.params;

	try {
		const userFound = await this.getByEmail(email);
		if (!userFound) {
			return res.status(404).json({ message: "No user found", payload: null });
		}
		res
			.status(200)
			.json({ message: "Requested user:", payload: userFound._id });
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

const getAllUsers = async (req, res) => {
	try {
		const users = await userService.getAll({});
		if (users.length === 0) {
			return res.status(404).json({ message: "No users found", payload: null });
		}
		const usersDtos = users.map((user) => {
			return UserDto.getUserDto(user);
		});

		res.status(200).json({ message: "Existing users", payload: usersDtos });
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
};

const updateUser = async (req, res) => {
	const { pid } = req.params;
	const toUpdate = req.body;
	try {
		const updatedPet = await userService.update(pid, toUpdate);
		if (!updatedPet) {
			return res.status(404).json({ message: "Can't Update", payload: null });
		}
		res.status(200).json({ message: "Updated pet:", payload: updatedPet });
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

const deleteUser = async (req, res) => {
	const { pid } = req.params;
	try {
		const deletedPet = userService.delete(pid);
		res.status(200).json({ message: "Deleted:", payload: deletedPet });
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export default {
	createUser,
	getAllUsers,
	getUserByEmail,
	updateUser,
	deleteUser,
};
