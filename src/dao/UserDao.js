import userModel from "./models/UserModel.js";
import GenericDao from "../repository/GenericDao.js";

class UserDao extends GenericDao {
	constructor(model) {
		super(model);
	}

	getByEmail = async (email) => {
		try {
			// console.log(await this.model.findOne({ email }));

			return await this.model.findOne({ email: email });
		} catch (error) {
			throw new Error(error);
		}
	};
}

const userDao = new UserDao(userModel);
export default userDao;
