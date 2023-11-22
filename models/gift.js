module.exports = (sequelize, DataTypes) => {
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
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      purchased: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
    return Gift;
  };
  