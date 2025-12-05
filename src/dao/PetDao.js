import petModel from "./models/PetModel.js";
import GenericDao from "../repository/GenericDao.js";

class PetDao extends GenericDao {
	constructor(model) {
		super(model);
	}
}

const petDao = new PetDao(petModel);
export default petDao;
