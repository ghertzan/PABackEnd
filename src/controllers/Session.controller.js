import { createToken } from "../utils/utils.js";

const login = (req, res) => {
	try {
		if (!req.user) throw new Error("Credential error");
		const token = createToken(req.user);
		res.cookie("authCookie", token, {
			maxAge: 3600000,
			httpOnly: true,
		});
		res.sendStatus(200);
	} catch (error) {
		res.status(500).json({ status: "Error", message: error.message });
	}
};

const logout = (req, res, next) => {
	res.clearCookie("connect.sid");
	res.clearCookie("authCookie");
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		req.session.destroy((err) => {
			if (err) {
				return next(err);
			}
		});

		res.status(200).json({ status: "OK", message: "Logged out successfully" });
	});
};

const current = (req, res) => {
	res.status(200).json({ status: "OK", payload: req.user });
};

export default {
	login,
	logout,
	current,
};
