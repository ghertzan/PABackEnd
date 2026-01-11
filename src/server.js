import express from "express";
import envs from "./config/envs.js";
import initMongoDB from "./dataBase/mongoDB.js";
import colors from "colors";
import petRouter from "./routes/petRoutes.js";
import userRouter from "./routes/userRoutes.js";
import adoptionRouter from "./routes/adoptionRoutes.js";
import sessionRouter from "./routes/sessionRoutes.js";
import mockingRoutes from "./routes/mocksRoutes.js";
import { __dirname, join } from "./utils/utils.js";
import { initializePassport } from "./config/passport.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import { fa } from "@faker-js/faker";

const app = express();

app.set("PORT", envs.API_PORT);

/* MIDDLEWARES */
const swaggerOptions = {
	definition: {
		openapi: "3.0.1",
		info: {
			title: "Documentación de la app Adoptme BackEnd",
			description: "API, para manejar la app (USUARIOS-MASCOTAS-ADOPCIONES)",
		},
	},
	apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		store: MongoStore.create({
			mongoUrl: envs.DB_MONGO_ATLAS_URL,
			ttl: 6000,
		}),
		secret: envs.SECRET,
		resave: false,
		saveUninitialized: false,
	})
);
app.use(express.static(join(__dirname, "../public")));
app.use(cookieParser());
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/pets", petRouter);
app.use("/api/users", userRouter);
app.use("/api/adoptions", adoptionRouter);
app.use("/api/session", sessionRouter);
app.use("/api/mocks", mockingRoutes);

/* MONGO init */

initMongoDB();

/* SERVIDOR */
app.listen(app.get("PORT"), () => {
	console.log(
		colors.bgYellow.bold(
			`Server running on http://localhost:${app.get("PORT")} `
		)
	);
});
