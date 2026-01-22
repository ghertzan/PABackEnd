import { adoptionService, petService, userService } from "../services/index.js";

const createAdoption = async (req, res) => {
	const { pid, uid } = req.params;
	try {
		const user = await userService.getById(uid);
		const pet = await petService.getById(pid);
		if (!user) {
			return res
				.status(404)
				.json({ status: "Error", message: "User not found" });
		}
		if (!pet) {
			return res
				.status(404)
				.json({ status: "Error", message: "Pet not found" });
		}
		if (pet.adopted) {
			return res.status(400).json({
				status: "Error",
				message: `Pet already adopted by: ${pet.owner} ID.`,
			});
		}
		const newAdoption = await adoptionService.create(uid, pid);
		res.status(201).json({
			message: "Adoption success",
			payload: newAdoption,
		});
	} catch (error) {
		res.status(500).json({
			status: "Error - Unable to create... see the error log.",
			error: error.message,
		});
	}
};

const getAllAdoptions = async (req, res) => {
	try {
		const adoptions = await adoptionService.getAll({});
		if (adoptions.length === 0) {
			return res
				.status(404)
				.json({ message: "No adoptions found", payload: null });
		}
		res.status(200).json({ message: "Existing adoptions", payload: adoptions });
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

const getAdoptionById = async (req, res) => {
	const { aid } = req.params;
	try {
		const adoptionFound = await adoptionService.getById(aid);
		if (!adoptionFound) {
			return res
				.status(404)
				.json({ message: "No adoption found", payload: null });
		}
		res.status(200).json({ message: "Requested pet:", payload: adoptionFound });
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

const updateAdoption = async (req, res) => {
	const { aid } = req.params;
	const toUpdate = req.body;
	try {
		const updatedAdoption = await adoptionService.update(aid, toUpdate);
		if (!updatedAdoption) {
			return res.status(404).json({ message: "Can't Update", payload: null });
		}
		res
			.status(200)
			.json({ message: "Updated Adoption:", payload: updatedAdoption });
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

const deleteAdoption = async (req, res) => {
	const { aid } = req.params;
	try {
		const deletedAdoption = await adoptionService.delete(aid);
		res.status(200).json({ message: "Deleted:", payload: deletedAdoption });
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export default {
	createAdoption,
	getAllAdoptions,
	getAdoptionById,
	updateAdoption,
	deleteAdoption,
};
