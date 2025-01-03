'use strict';

const { ReviewImage } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      {
        reviewId:1,
        url:'review-1-image.com'
      },
      {
        reviewId:2,
        url:'review-2-image-1.com'
      },
      {
        reviewId:3,
        url:'review-2-image-2.com'
      },
      {
        reviewId:4,
        url:'review-3-image.com'
      },
    ],{})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId:{[Op.in]:[1,2,3,4]}
    },{})
  }
};