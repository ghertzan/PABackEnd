import winston from "winston";

const { timestamp, prettyPrint, label } = winston.format;

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
};

const colors = {
	fatal: "red",
	error: "orange",
	warn: "yellow",
	info: "green",
	http: "blue",
};

export const logger = winston.createLogger({
	levels,
	transports: [
		new winston.transports.Console({
			level: "info",
			format: winston.format.combine(
				winston.format.colorize(colors),
				winston.format.simple(),
			),
		}),
		new winston.transports.File({
			filename: "./errors.log",
			level: "error",
			format: winston.format.combine(
				winston.format.simple(),
				label({ label: "Error" }),
				timestamp({ format: "DD-MM-YYYY HH:mm:ss", timezoned }),
				prettyPrint(),
			),
		}),
	],
});
