const express = require("express");
const router = express.Router();
const sequelize = require("../db");
const Gift = sequelize.models.Gift;

// create a new gift

router.post("/", function (req, res) {
	Gift.create({
		name: req.body.gift.name,
		imageLink: req.body.gift.imageLink,
		description: req.body.gift.description,
		price: req.body.gift.price,
		userId: req.user.id,
	})
		.then(function createSuccess(gift) {
			res.status(200).json({
				gift: gift,
				message: "gift created successfully. please buy it for me",
			});
		})
		.catch((err) => res.status(500).json({ error: err }));
});

// get all gifts

router.get("/", function (req, res) {
	Gift.findAll()
		.then((gifts) => res.status(200).json(gifts))
		.catch((err) => res.status(500).json({ error: err }));
});

// update a gift

router.put("/:id", function (req, res) {
	const updateGift = {
		name: req.body.gift.name,
		imageLink: req.body.gift.imageLink,
		description: req.body.gift.description,
		price: req.body.gift.price,
	};

	const query = { where: { id: req.params.id } };

	Gift.update(updateGift, query)
		.then((recordsChanged) =>
			res.status(200).json({ message: `${recordsChanged} records changed.` })
		)
		.catch((err) => res.status(500).json({ error: err }));
});

// delete a gift
router.delete("/:id", function (req, res) {
	const query = { where: { id: req.params.id } };
	Gift.destroy(query).then(
		(recordsChanged) =>
			res.status(200).json({
				message: `${recordsChanged} record(s) changed.`,
			}),
		(err) => res.status(500).json({ error: err, message: "delete failed" })
	);
});

// get gifts by userid

router.get("/:id", function (req, res) {
	Gift.findAll({
		where: { userId: req.params.userId },
	})
		.then((gifts) => res.status(200).json(gifts))
		.catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
