import adoptionService from "../services/AdoptionService.js";

class AdoptionController {
	constructor(service) {
		this.service = service;
	}

	create = async (req, res) => {
		const { pid, uid } = req.params;
		try {
			const newAdoption = await this.service.create({
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

	getAll = async (req, res) => {
		try {
			const adoptions = await this.service.getAll({});
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

	getById = async (req, res) => {
		const { aid } = req.params;
		try {
			const adoptionFound = await this.service.getById(aid);
			if (!adoptionFound) {
				return res
					.status(404)
					.json({ message: "No adoption found", payload: null });
			}
			res
				.status(200)
				.json({ message: "Requested pet:", payload: adoptionFound });
		} catch (error) {
			res.status(500).json({
				message: "Internal Server Error",
				error: error.message,
			});
		}
	};

	update = async (req, res) => {
		const { aid } = req.params;
		const toUpdate = req.body;
		try {
			const updatedAdoption = await this.service.update(aid, toUpdate);
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

const adoptionController = new AdoptionController(adoptionService);
export default adoptionController;
