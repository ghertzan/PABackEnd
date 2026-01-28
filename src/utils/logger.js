import winston from "winston";
import envs from "../config/envs.js";

const { timestamp, combine, colorize, printf, json } = winston.format;

const timezoned = () => {
	return new Date().toLocaleString("es-AR", {
		timeZone: "America/Cordoba",
	});
};
const levels = {
	fatal: 0,
	error: 1,
	warn: 2,
	info: 3,
	http: 4,
	debug: 5,
};

const colors = {
	fatal: "red",
	error: "orange",
	warn: "yellow",
	info: "green",
	http: "blue",
	debug: "white",
};

winston.addColors(colors);

const transports = [];

if (envs.NODE_ENV === "production") {
	transports.push(
		new winston.transports.Console({ level: "info" }),
		new winston.transports.File({
			filename: "./errors.log",
			level: "error",
			format: combine(timestamp({ format: timezoned }), json()),
		}),
	);
} else {
	transports.push(
		new winston.transports.Console({
			level: "debug",
			format: combine(
				colorize({ all: true }),
				timestamp({ format: timezoned }),
				printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
			),
		}),
	);
}

export const logger = winston.createLogger({
	levels,
	transports,
});
