import passport from "passport";
import local from "passport-local";
import { userService } from "../services/index.js";
import { isValidPassword } from "../utils/utils.js";
import userDto from "../dto/UserDto.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
	passport.use(
		"login",
		new LocalStrategy(
			{
				usernameField: email,
			},
			async (username, password, done) => {
				try {
					const userFound = userService.getByEmail(username);
					if (!userFound) throw new Error(`${username}, already used.`);
					const isValidPass = isValidPassword(password, userFound.password);
					if (!isValidPass) throw new Error("Credential errors");
					const user = userDto.getUserDto(userFound);
					done(null, user);
				} catch (error) {
					done(error, null);
				}
			}
		)
	);

	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser(async (id, done) => {
		const user = await userService.getById(id);
		done(null, user);
	});
};
