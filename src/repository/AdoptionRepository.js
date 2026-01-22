import GenericRepository from "./GenericRepository.js";
import { userService } from "../services/index.js";
import { petService } from "../services/index.js";
export default class AdoptionRepository extends GenericRepository {
	constructor(dao) {
		super(dao);
	}

	// The user and pet must exist
	//PET adopted must be false
	create = async (uid, pid) => {
		try {
			const newAdoption = this.dao.create({ pet_id: pid, owner_user_id: uid });
			await petService.update(pid, { adopted: true, owner: uid });
			const user = await userService.getById(uid);
			user.adopted_pets.push({ pet_id: pid });
			await user.save();
			return newAdoption;
		} catch (error) {
			throw new Error(error.message);
		}
	};

	delete = async (aid) => {
		try {
			const deletedAdoption = this.dao.delete(aid);
			const { pet_id, owner_user_id } = deletedAdoption;
			const userFound = userService.getById(owner_user_id);
			const adoptedPets = userFound.adoptedPets;
		} catch (error) {
			throw new Error(error.message);
		}
	};
}
