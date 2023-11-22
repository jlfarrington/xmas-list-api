const express = require("express");
const router = express.Router();
const sequelize = require("../db");
const User = sequelize.models.User;

// create a new User

router.post("/", function (req, res) {
	User.create({
		name: req.body.user.name,
	})
		.then(function createSuccess(user) {
			res.status(200).json({
				user: user,
				message: `user ${user.name} created successfully.`,
			});
		})
		.catch((err) => res.status(500).json({ error: err }));
});

// get all users

router.get("/", function (req, res) {
	User.findAll()
		.then((users) => res.status(200).json(users))
		.catch((err) => res.status(500).json({ error: err }));
});

// delete a user
router.delete("/:id", function (req, res) {
	const query = { where: { id: req.params.id } };
	User.destroy(query).then(
		(recordsChanged) =>
			res.status(200).json({
				message: `${recordsChanged} record(s) changed.`,
			}),
		(err) => res.status(500).json({ error: err, message: "delete failed" })
	);
});

module.exports = router;
