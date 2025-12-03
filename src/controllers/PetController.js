import petService from "../services/PetService.js";

class PetController {
	constructor(service) {
		this.service = service;
	}
	create = async (req, res) => {
		const newPet = req.body;
		try {
			const pet = await this.service.create(newPet);
			res.status(200).json({ message: "Pet Created", payload: pet });
		} catch (error) {
			res.status(500).json({
				message: "Unable to create... see the error log.",
				error: error.message,
			});
		}
	};

	getAll = async (req, res) => {
		try {
			const pets = await this.service.getAll({});
			if (pets.length === 0) {
				return res
					.status(404)
					.json({ message: "No pets found", payload: null });
			}
			res.status(200).json({ message: "Existing pets", payload: pets });
		} catch (error) {
			res.status(500).json({
				message: "Internal Server Error",
				error: error.message,
			});
		}
	};

	getById = async (req, res) => {
		const { pid } = req.params;
		console.log(pid);

		try {
			const petFound = await this.service.getById(pid);
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

const petController = new PetController(petService);
export default petController;
