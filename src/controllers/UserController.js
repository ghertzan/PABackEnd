import userService from "../services/UserService.js";

class UserController {
	constructor(service) {
		this.service = service;
	}

	create = async (req, res) => {
		const newUser = req.body;
		try {
			const user = await this.service.create(newUser);
			res.status(200).json({ message: "User Created", payload: user._id });
		} catch (error) {
			res.status(500).json({
				message: "Unable to create... see the error log.",
				error: error.message,
			});
		}
	};

	getByEmail = async (req, res) => {
		const { email } = req.params;

		try {
			const userFound = await this.getByEmail(email);
			if (!userFound) {
				return res
					.status(404)
					.json({ message: "No user found", payload: null });
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

	getAll = async (req, res) => {
		try {
			const users = await this.service.getAll({});
			if (users.length === 0) {
				return res
					.status(404)
					.json({ message: "No users found", payload: null });
			}
			res.status(200).json({ message: "Existing users", payload: users });
		} catch (error) {
			res.status(500).json({
				message: "Internal Server Error",
			});
		}
	};

	update = async (req, res) => {
		const { pid } = req.params;
		const toUpdate = req.body;
		try {
			const updatedPet = await this.service.update(pid, toUpdate);
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

	delete = async (req, res) => {
		const { pid } = req.params;
		try {
			const deletedPet = this.service.delete(pid);
			res.status(200).json({ message: "Deleted:", payload: deletedPet });
		} catch (error) {
			res.status(500).json({
				message: "Internal Server Error",
				error: error.message,
			});
		}
	};
}

const userController = new UserController(userService);
export default userController;
