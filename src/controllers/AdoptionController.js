import { adoptionService } from "../services/index.js";

const createAdoption = async (req, res) => {
	const { pid, uid } = req.params;
	try {
		const newAdoption = await adoptionService.create({
			pet_id: pid,
			owner_user_id: uid,
		});
		res.status(200).json({
			message: "Adoption success",
			payload: newAdoption,
		});
	} catch (error) {
		res.status(500).json({
			message: "Unable to create... see the error log.",
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
		res
			.status(200)
			.json({ message: "Existing adoptions", payload: await adoptions });
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
	const { pid } = req.params;
	try {
		const deletedPet = adoptionService.delete(pid);
		res.status(200).json({ message: "Deleted:", payload: deletedPet });
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
