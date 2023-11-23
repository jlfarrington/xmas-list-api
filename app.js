require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./db");
const Gift = require("./controllers/giftController");
const User = require("./controllers/userController");
const { launchAndReturnInfo } = require("./utils/linkInfoTool");

sequelize.sync();
app.use(require("./middleware/headers"));
app.use(express.json());

app.use("/gift", Gift);
app.use("/user", User);

app.post("/info", async (req, res) => {
	const inputURL = req.body.url;
	console.log(
		"request for link info received, getting info for the following url ",
		inputURL
	);

	if (inputURL) {
		try {
			const linkInfo = await launchAndReturnInfo(inputURL);
			console.log(`linkInfo: `, linkInfo.title);
			if (linkInfo.title) {
				res.status(200).json({
					linkInfo,
				});
			} else {
				res.status(400).json({
					message: "no valid info found for this link.",
					url: url,
					error: linkInfo,
				});
			}
		} catch (e) {
			res.status(500).json({
				message: "error occurred when fetching gift info",
				error: e,
			});
		}
	}
});

app.listen(8080, function () {
	console.log("christmas list server is listening on port 8080");
});
