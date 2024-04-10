const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userService = require('../services/userService');
const adminService = require('../services/adminService');
const { JWT_SECRET } = require("../utils/config");

module.exports = {
	userSignup: async (req, res) => {
		const { name, email, phone, password } = req.body;
		try {
			let hashedPassword = await bcrypt.hash(String(password), await bcrypt.genSalt(10));
			let items = { name, email, phone, password: hashedPassword }
			const users = await userService.createNewUser(items);
			if (users === 2) {
				return res.json({ statusCode: 0, message: "Failed to create account" });
			} else if (users === 0) {
				return res.json({ statusCode: 0, message: "Email / Phone number already exists" });
			} else {
				return res.json({ statusCode: 1, message: 'Account created successfully' });
			}
		} catch (error) {
			console.log("error in AUTH CONTROLLER -- userSignup :: ", error);
			return res.status(500).json({statusCode:2, message: 'Internal Server Error'});
		}
	},
	userLogin: async (req, res) => {
		const { email, password } = req.body;
		try {
			const users = await userService.loginUser(email);
			if (users[0] && (await bcrypt.compare(password, users[0].password))) {
				const accessToken = jwt.sign({
					name: users[0].name,
					email: users[0].email,
					id: users[0].id,
				}, JWT_SECRET, { expiresIn: "24h" });
				const usersData = await userService.getUsersByEmail(users[0].email)
				return res.json({ statusCode: 1, token: accessToken, data: usersData, message: 'Login Successfully' });
			} else {
				return res.json({ statusCode: 0, token: null, data: {}, message: 'Invalid username or password' });
			}
		} catch (error) {
			console.log("error in AUTH CONTROLLER -- userLogin :: ", error);
			return res.status(500).json({statusCode:2, message: 'Internal Server Error'});
		}
	},
	userLoginVerifyOTP: async (req, res) => {
		const { email, password, otp } = req.body;
		try {
			const users = await userService.loginUser(email);
			if (users && (await bcrypt.compare(password, users.password))) {
				let current_timestamp = Math.floor(Date.now() / 1000)
				if ((Number(users.otptimestamp) + 10020 > Number(current_timestamp) && (Number(users.otp) === Number(otp)))) {
					const usersData = await userService.getUsersByEmail(users.email)
					const accessToken = jwt.sign({
						name: users.name,
						email: users.email,
						id: users._id,
					},
						JWT_SECRET,
						{ expiresIn: "24h" }
					);
					return res.json({ statusCode: successCode, token: accessToken, result: usersData, message: 'successful' });
				}
				throw new UnauthorizedError(InvalidOtp);
			} else {
				throw new UnauthorizedError(InvalidLogin);
			}
		} catch (error) {
			console.log("controller -- userLoginVerifyOTP :: ", error);
			return handleCustomError(res, error)
		}
	},
	adminLogin: async (req, res) => {
		const { email, password } = req.body;
		try {
			const users = await adminService.loginUser(email);
			if (users[0] && (await bcrypt.compare(password, users[0].password))) {
				const accessToken = jwt.sign({
					name: users[0].name,
					email: users[0].email,
					id: users[0].id,
				},JWT_SECRET,{ expiresIn: "24h" }
				);
				const usersData = await adminService.getUsersByEmail(users[0].email)
				return res.json({ statusCode: 1, token: accessToken, data: usersData, message: 'Login Successfully' });
			} else {
				return res.json({ statusCode: 0, token: null, data: {}, message: 'Invalid username or password' });
			}
		} catch (error) {
			console.log("error in AUTH CONTROLLER -- adminLogin :: ", error);
			return res.status(500).json({statusCode:2, message: 'Internal Server Error'});
		}
	}
}