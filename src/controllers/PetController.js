import { petService } from "../services/index.js";

const createPet = async (req, res) => {
	const newPet = req.body;
	try {
		const pet = await petService.create(newPet);

		res.status(200).json({ message: "Pet Created", payload: pet });
	} catch (error) {
		res.status(500).json({
			message: "Unable to create... see the error log.",
			error: error.message,
		});
	}
};

const getAllPets = async (req, res) => {
	try {
		const pets = await petService.getAll({});
		if (pets.length === 0) {
			return res.status(404).json({ message: "No pets found", payload: null });
		}
		res.status(200).json({ message: "Existing pets", payload: pets });
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

const getPetById = async (req, res) => {
	const { pid } = req.params;

	try {
		const petFound = await petService.getById(pid);
		if (!petFound) {
			return res.status(404).json({ message: "No pet found", payload: null });
		}
		res.status(200).json({ message: "Requested pet:", payload: petFound });
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

const updatePet = async (req, res) => {
	const { pid } = req.params;
	const toUpdate = req.body;
	try {
		const updatedPet = await petService.update(pid, toUpdate);
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

const deletePet = async (req, res) => {
	const { pid } = req.params;
	try {
		const deletedPet = await petService.delete(pid);
		res.status(200).json({ message: "Deleted:", payload: deletedPet });
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export default {
	createPet,
	getAllPets,
	getPetById,
	updatePet,
	deletePet,
};
