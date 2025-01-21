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
      {
        spotId: 1,
        userId: 1,
        startDate: '2022-11-05',
        endDate: '2022-11-08'
      },
      {
        spotId: 1,
        userId: 3,
        startDate: '2022-05-19',
        endDate: '2022-05-20'
      },
      {
        spotId: 1,
        userId: 4,
        startDate: '2024-06-17',
        endDate: '2024-07-18'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2024-02-18',
        endDate: '2024-03-30'
      },
      {
        spotId: 2,
        userId: 3,
        startDate: '2022-10-02',
        endDate: '2022-12-20'
      },
      {
        spotId: 3,
        userId: 1,
        startDate: '2021-02-01',
        endDate: '2021-02-28'
      },
      {
        spotId: 3,
        userId: 1,
        startDate: '2024-10-02',
        endDate: '2024-10-25'
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '2024-12-30',
        endDate: '2025-01-02'
      },
      {
        spotId: 4,
        userId: 2,
        startDate: '2023-01-15',
        endDate: '2023-01-20'
      },
      {
        spotId: 5,
        userId: 3,
        startDate: '2023-02-10',
        endDate: '2023-02-15'
      },
      {
        spotId: 6,
        userId: 4,
        startDate: '2023-03-05',
        endDate: '2023-03-10'
      },
      {
        spotId: 7,
        userId: 5,
        startDate: '2023-04-01',
        endDate: '2023-04-05'
      },
      {
        spotId: 8,
        userId: 6,
        startDate: '2023-05-01',
        endDate: '2023-05-05'
      },
      {
        spotId: 9,
        userId: 7,
        startDate: '2023-06-01',
        endDate: '2023-06-05'
      },
      {
        spotId: 10,
        userId: 8,
        startDate: '2023-07-01',
        endDate: '2023-07-05'
      },
      {
        spotId: 11,
        userId: 9,
        startDate: '2023-08-01',
        endDate: '2023-08-05'
      },
      {
        spotId: 12,
        userId: 10,
        startDate: '2023-09-01',
        endDate: '2023-09-05'
      },
      {
        spotId: 13,
        userId: 11,
        startDate: '2023-10-01',
        endDate: '2023-10-05'
      },
      {
        spotId: 14,
        userId: 1,
        startDate: '2023-11-01',
        endDate: '2023-11-05'
      },
      {
        spotId: 15,
        userId: 2,
        startDate: '2023-12-01',
        endDate: '2023-12-05'
      },
      {
        spotId: 16,
        userId: 3,
        startDate: '2024-01-01',
        endDate: '2024-01-05'
      },
      {
        spotId: 17,
        userId: 4,
        startDate: '2024-02-01',
        endDate: '2024-02-05'
      },
      {
        spotId: 18,
        userId: 5,
        startDate: '2024-03-01',
        endDate: '2024-03-05'
      },
      {
        spotId: 19,
        userId: 6,
        startDate: '2024-04-01',
        endDate: '2024-04-05'
      },
      {
        spotId: 20,
        userId: 7,
        startDate: '2024-05-01',
        endDate: '2024-05-05'
      },
      {
        spotId: 21,
        userId: 8,
        startDate: '2024-06-01',
        endDate: '2024-06-05'
      },
      {
        spotId: 22,
        userId: 9,
        startDate: '2024-07-01',
        endDate: '2024-07-05'
      },
      {
        spotId: 1,
        userId: 10,
        startDate: '2024-08-01',
        endDate: '2024-08-05'
      },
      {
        spotId: 2,
        userId: 11,
        startDate: '2024-09-01',
        endDate: '2024-09-05'
      },
      {
        spotId: 3,
        userId: 1,
        startDate: '2024-10-01',
        endDate: '2024-10-05'
      },
      {
        spotId: 4,
        userId: 2,
        startDate: '2024-11-01',
        endDate: '2024-11-05'
      },
      {
        spotId: 5,
        userId: 3,
        startDate: '2024-12-01',
        endDate: '2024-12-05'
      },
      {
        spotId: 6,
        userId: 4,
        startDate: '2025-01-01',
        endDate: '2025-01-05'
      }
    ], {});
  },


  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId:{[Op.in]:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]}
    }, {});
  }
};