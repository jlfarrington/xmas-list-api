const { Sequelize, DataTypes } = require("sequelize");

let sequelize;
if (process.env.IS_LOCAL) {
	sequelize = new Sequelize("christmas-list", "postgres", "password", {
		host: "localhost",
		dialect: "postgres",
	});
} else {
	sequelize = new Sequelize(
		"postgres://xmaslist_user:uWBWrMLaeF8S3RA8SE55aWZmRNqb3kez@dpg-cie3ugt9aq0ce3a8mafg-a/xmaslist"
	);
}

sequelize.authenticate().then(
	function () {
		console.log("Connected to xmas-list database");
	},
	function (err) {
		console.log(err);
	}
);

const User = sequelize.define("User", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

const Gift = sequelize.define("gift", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	imageLink: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	price: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	url: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	purchased: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

module.exports = sequelize;
