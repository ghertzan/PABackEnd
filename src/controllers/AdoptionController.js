import { adoptionService } from "../services/index.js";

const createAdoption = async (req, res) => {
	const { pid, uid } = req.params;
	try {
		const newAdoption = await adoptionService.create(uid, pid);
		res.status(201).json({
			message: "Adoption success",
			payload: newAdoption,
		});
	} catch (error) {
		res.status(error.status || 500).json({
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
		res
			.status(200)
			.json({ message: "Requested adoption:", payload: adoptionFound });
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
		res.status(error.status || 500).json({
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export default {
	createAdoption,
	getAllAdoptions,
	getAdoptionById,
	deleteAdoption,
};
