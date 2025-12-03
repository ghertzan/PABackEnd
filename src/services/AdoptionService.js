import apdoptionDao from "../dao/AdoptionDao.js";

class AdoptionService {
	constructor(dao) {
		this.dao = dao;
	}

	create = async (toCreate) => {
		try {
			return await this.dao.create(toCreate);
		} catch (error) {
			throw new Error(error);
		}
	};

	getAll = async () => {
		try {
			return await this.dao.getAll({});
		} catch (error) {
			throw new Error(error);
		}
	};

	getById = async (id) => {
		try {
			return await this.dao.getById(id);
		} catch (error) {
			throw new Error(error);
		}
	};

	update = async (id, toUpdate) => {
		try {
			return await this.dao.update(id, toUpdate);
		} catch (error) {
			throw new Error(error);
		}
	};

	delete = async (id) => {
		try {
			return await this.dao.delete(id);
		} catch (error) {
			throw new Error(error);
		}
	};
}

const adoptionService = new AdoptionService(apdoptionDao);
export default adoptionService;
