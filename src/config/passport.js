import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";
import { userService } from "../services/index.js";
import { isValidPassword } from "../utils/utils.js";
import userDto from "../dto/UserDto.js";
import envs from "./envs.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
	passport.use(
		"login",
		new LocalStrategy(
			{
				usernameField: "email",
			},
			async (username, password, done) => {
				try {
					const userFound = await userService.getByEmail(username);
					if (!userFound) throw new Error("Credential error/s");
					const isValidPass = isValidPassword(password, userFound.password);
					if (!isValidPass) throw new Error("Credential error/s");
					const user = userDto.getUserDto(userFound);
					done(null, user);
				} catch (error) {
					done(error, null);
				}
			}
		)
	);
	passport.use(
		"jwt",
		new jwt.Strategy(
			{
				jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]),
				secretOrKey: envs.JWT_SECRET,
			},
			async (jwt_payload, done) => {
				try {
					return done(null, jwt_payload);
				} catch (error) {
					return done(error);
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

const cookieExtractor = (req) => {
	let token = null;
	if (req && req.cookies) {
		token = req.cookies["authCookie"];
	}
	return token;
};

export { initializePassport };
