'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
        Review.hasMany(models.ReviewImage, { foreignKey: "reviewId" });
        Review.belongsTo(models.User, { foreignKey: "userId" });
        Review.belongsTo(models.Spot, { foreignKey: "spotId" });
    }
  }
  Review.init({
    spotId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};