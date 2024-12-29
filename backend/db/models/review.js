'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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
    review: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    stars: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Spot',
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    },
  }, {
    sequelize,
    modelName: 'Review',
    ...options
  });
  return Review;
};