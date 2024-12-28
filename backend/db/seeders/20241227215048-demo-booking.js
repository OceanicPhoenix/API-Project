'use strict';

const { Booking } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
    {
      spotId:1,
      userId:1,
      startDate:'2022-11-05',
      endDate:'2022-11-08'
    },
    {
      spotId:1,
      userId:3,
      startDate:'2022-05-19',
      endDate:'2022-05-20'
    },
    {
      spotId:1,
      userId:4,
      startDate:'2024-06-17',
      endDate:'2024-07-18'
    },
    {
      spotId:2,
      userId:2,
      startDate:'2024-02-18',
      endDate:'2024-03-30'
    },
    {
      spotId:2,
      userId:3,
      startDate:'2022-10-02',
      endDate:'2022-12-20'
    },
    {
      spotId:3,
      userId:1,
      startDate:'2021-02-01',
      endDate:'2021-02-28'
    },
    {
      spotId:3,
      userId:1,
      startDate:'2024-10-02',
      endDate:'2024-10-25'
    },
    {
      spotId:2,
      userId:1,
      startDate:'2024-12-30',
      endDate:'2025-01-02'
    },
  ],{});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId:{[Op.in]:[1,2,3]}
    }, {});
  }
};