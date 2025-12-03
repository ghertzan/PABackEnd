import adoptionModel from "./models/AdoptionModel.js";

class AdoptionDao {
	constructor(model) {
		this.model = model;
	}

	create = async (toCreate) => {
		try {
			return await this.model.create(toCreate);
		} catch (error) {
			throw new Error(error);
		}
	};

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

	getById = async (id) => {
		try {
			return await this.model.findById(id);
		} catch (error) {
			throw new Error(error);
		}
	};

	update = async (id, toUpdate) => {
		try {
			return await this.model.findByIdAndUpdate(id, toUpdate, { new: true });
		} catch (error) {
			throw new Error(error);
		}
	};

	delete = async (id) => {
		try {
			return await this.model.findByIdAndDelete(id);
		} catch (error) {
			throw new Error(error);
		}
	};
}

const apdoptionDao = new AdoptionDao(adoptionModel);
export default apdoptionDao;
