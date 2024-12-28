'use strict';
const {Review} = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        userId:1,
        spotId:1,
        review:'Great place! The host was very welcoming and the location was perfect.',
        stars:5,
      },
      {
        userId:1,
        spotId:1,
        review:'Just like many of the other reviews, I had a great experience here, though I wish there was a bit more communication from the host.',
        stars:4,
      },
      {
        userId:2,
        spotId:2,
        review:'Not a great place. Dirty and unkept. Would not recommend.',
        stars:1,
      },
      {
        userId:3,
        spotId:3,
        review:'Amazing place! The host was very accommodating and the property was beautiful.',
        stars:5,
      },
      {
        userId:1,
        spotId:3,
        review:'A lovely place to spend a weekend. The host was very kind and the property was beautiful.',
        stars:5,
      },
      {
        userId:4,
        spotId:3,
        review:'The host was very kind and I loved the property. I would definitely stay here again.',
        stars:4,
      },
    ],{});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId:{[Op.in]:[1,2,3,4]}
    },{});
  }
};