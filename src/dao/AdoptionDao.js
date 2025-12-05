import GenericDao from "../repository/GenericDao.js";
import adoptionModel from "./models/AdoptionModel.js";

class AdoptionDao extends GenericDao {
	constructor(model) {
		super(model);
	}

	getAll = async () => {
		try {
			return await this.model.find({}).populate([
				{ path: "pet_id", select: "name" },
				{ path: "owner_user_id", select: "first_name" },
			]);
		} catch (error) {
			throw new Error(error);
		}
	};
}

const apdoptionDao = new AdoptionDao(adoptionModel);
export default apdoptionDao;
