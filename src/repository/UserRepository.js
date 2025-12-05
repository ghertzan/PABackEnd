import GenericRepository from "./GenericRepository.js";

export default class UserRepository extends GenericRepository {
	constructor(dao) {
		super(dao);
	}

	getByEmail = async (email) => {
		try {
			return await this.dao.getByEmail(email);
		} catch (error) {
			throw new Error(error);
		}
	};
}
