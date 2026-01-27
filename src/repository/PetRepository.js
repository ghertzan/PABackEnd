import GenericRepository from "./GenericRepository.js";
import { CustomError } from "../utils/CustomError.js";
import { petService } from "../services/index.js";
export default class PetRepository extends GenericRepository {
	constructor(dao) {
		super(dao);
	}

	update = async (pid, toUpdate) => {
		try {
			const pet = await petService.getById(pid);
			if (!pet) throw new CustomError("Pet not found", 404);
			const updatedPet = await this.dao.update(pet._id, toUpdate);
			if (!updatedPet) throw new CustomError("Internal Server Error", 500);
			return updatedPet;
		} catch (error) {
			throw new CustomError(error.message, error.status || 500);
		}
	};
}
