export default class UserDto {
	static getUserDto = (entity) => {
		const dto = {
			name: `${entity.last_name}, ${entity.first_name}`,
			role: entity.role,
			email: entity.email,
		};
		return dto;
	};
}
