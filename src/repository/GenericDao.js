export default class GenericDao {
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

	insertMany = async (manyToInsert) => {
		try {
			return await this.model.insertMany(manyToInsert);
		} catch (error) {
			throw new Element(error);
		}
	};

	getAll = async () => {
		try {
			return await this.model.find({});
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
