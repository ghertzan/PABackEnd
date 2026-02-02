import userModel from "./models/UserModel.js";
import GenericDao from "../repository/GenericDao.js";

class UserDao extends GenericDao {
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

	getByEmail = async (email) => {
		try {
			// console.log(await this.model.findOne({ email }));

			return await this.model.findOne({ email: email }).lean();
		} catch (error) {
			throw new Error(error);
		}
	};
}

const userDao = new UserDao(userModel);
export default userDao;
