import GenericRepository from "./GenericRepository.js";
import { userService } from "../services/index.js";
import { petService } from "../services/index.js";
import { CustomError } from "../utils/CustomError.js";
export default class AdoptionRepository extends GenericRepository {
	constructor(dao) {
		super(dao);
	}

	create = async (uid, pid) => {
		try {
			const user = await userService.getById(uid);
			if (!user) throw new CustomError("User, not found", 404);
			const pet = await petService.getById(pid);
			if (!pet) throw new CustomError("Pet not found", 404);
			if (pet.adopted) throw new CustomError("Pet already adopted", 400);
			const newAdoption = this.dao.create({ pet_id: pid, owner_user_id: uid });
			await petService.update(pet._id, { adopted: true, owner: user._id });
			user.adopted_pets.push({ pet_id: pet._id });
			await userService.update(user._id, { adopted_pets: user.adopted_pets });
			return newAdoption;
		} catch (error) {
			throw new CustomError(error.message, 500);
		}
	};

	delete = async (aid) => {
		try {
			const adoptionFound = await this.dao.getById(aid);
			if (!adoptionFound) throw new CustomError("Adoption not found", 404);
			const deletedAdoption = await this.dao.delete(aid);
			const { pet_id, owner_user_id } = deletedAdoption;
			const user = await userService.getById(owner_user_id);
			const newAdopted_Pets = user.adopted_pets.filter(
				(pet) => !pet.pet_id.equals(pet_id),
			);
			await userService.update(user._id, { adopted_pets: newAdopted_Pets });
			await petService.update(pet_id, { adopted: false, owner: null });
			return deletedAdoption;
		} catch (error) {
			throw new CustomError(error.message, error.status);
		}
	};
}
