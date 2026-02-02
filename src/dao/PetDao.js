import petModel from "./models/PetModel.js";
import GenericDao from "../repository/GenericDao.js";

class PetDao extends GenericDao {
	constructor(model) {
		super(model);
	}

	getAll = async () => {
		try {
			return await this.model.find({}).lean();
		} catch (error) {
			throw new Error(error);
		}
	};

	getById = async (id) => {
		try {
			return await this.model.findById(id).lean();
		} catch (error) {
			throw new Error(error);
		}
	};
}

const petDao = new PetDao(petModel);
export default petDao;
