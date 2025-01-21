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
    {
      userId:5,
      spotId:4,
      review:'Decent place, but could use some improvements.',
      stars:3,
    },
    {
      userId:6,
      spotId:5,
      review:'Had a wonderful time, the host was very friendly.',
      stars:5,
    },
    {
      userId:7,
      spotId:6,
      review:'Not worth the price, very disappointed.',
      stars:2,
    },
    {
      userId:8,
      spotId:7,
      review:'A hidden gem! Will definitely come back.',
      stars:5,
    },
    {
      userId:9,
      spotId:8,
      review:'Average experience, nothing special.',
      stars:3,
    },
    {
      userId:10,
      spotId:9,
      review:'Fantastic place, highly recommend!',
      stars:5,
    },
    {
      userId:11,
      spotId:10,
      review:'The host was rude and unhelpful.',
      stars:1,
    },
    {
      userId:12,
      spotId:11,
      review:'Beautiful location, very peaceful.',
      stars:4,
    },
    {
      userId:13,
      spotId:12,
      review:'The property was not as described.',
      stars:2,
    },
    {
      userId:14,
      spotId:13,
      review:'Had a great time, everything was perfect.',
      stars:5,
    },
    {
      userId:15,
      spotId:14,
      review:'Would not stay here again.',
      stars:1,
    },
    {
      userId:1,
      spotId:15,
      review:'Lovely place, very clean and well maintained.',
      stars:4,
    },
    {
      userId:2,
      spotId:16,
      review:'The host was very accommodating.',
      stars:5,
    },
    {
      userId:3,
      spotId:17,
      review:'Not a great experience, the place was dirty.',
      stars:2,
    },
    {
      userId:4,
      spotId:18,
      review:'Amazing place, will definitely return.',
      stars:5,
    },
    {
      userId:5,
      spotId:19,
      review:'The location was perfect, very convenient.',
      stars:4,
    },
    {
      userId:6,
      spotId:20,
      review:'The host was very friendly and helpful.',
      stars:5,
    },
    {
      userId:7,
      spotId:21,
      review:'Not worth the money, very disappointed.',
      stars:2,
    },
    {
      userId:8,
      spotId:22,
      review:'A wonderful place to stay, highly recommend.',
      stars:5,
    }
    ],{});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId:{[Op.in]:[1,2,3,4,5,6,7,8]}
    },{});
  }
};