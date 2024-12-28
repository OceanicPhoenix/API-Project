'use strict';
const { Spot } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '7318 Foothill Road',
        city: 'Huhville',
        state: 'CA',
        country: 'USA',
        lat: 78.13410,
        lng: -217.13498,
        name: 'Hilly House',
        description: 'A beautiful house sitting at the apex of the city.',
        price: 58.00
      },
      {
        ownerId: 1,
        address: '491 Helos St',
        city: 'Marley',
        state: 'VA',
        country: 'USA',
        lat: 28.18018,
        lng: -68.39581,
        name: 'The Marleyan Mansion',
        description: 'A wide mansion fit for a nobleman, with a lovely garden to wash away your worries.',
        price: 491.00
      },
      {
        ownerId: 2,
        address: '402 Eren St',
        city: 'Paradis',
        state: 'NV',
        country: 'USA',
        lat: 35.48787,
        lng: -58.94688,
        name: 'Vintage Condo',
        description: 'A nice condo for a small family, with a vintage feel.',
        price: 142.00
      },
      {
        ownerId: 2,
        address: '123 Ocean Dr',
        city: 'Beachcity',
        state: 'TX',
        country: 'USA',
        lat: 29.87654,
        lng:  -95.34567,
        name: 'Beach Villa',
        description: 'A villa by the beach, perfect for a summer getaway.',
        price: 300.00
      },
      {
        ownerId: 3,
        address: '529 Main St',
        city: 'Woodland',
        state: 'CA',
        country: 'USA',
        lat: 38.98765,
        lng: -121.12412,
        name: 'Secluded Cabin',
        description: 'A cabin far from the city, perfect for a quiet retreat.',
        price: 84.00
      },
      {
        ownerId: 3,
        address: '941 Lakeview Dr',
        city: 'Lake Tahoe',
        state: 'NV',
        country: 'USA',
        lat: 42.41824,
        lng: -52.11380,
        name: 'Tahoe\'s Urban Oasis',
        description: 'An oasis perfect for a family vacation, with a view of the lake.',
        price: 134.00
      },
      {
        ownerId: 3,
        address: '319 Redwood Rd',
        city: 'Redwood',
        state: 'MI',
        country: 'USA',
        lat: 44.47191,
        lng: -123.41902,
        name: 'Redwood Cabin',
        description: 'A rustic cabin that feels like home, surrounded by redwoods that keep you connected to nature.',
        price: 1000.00
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId:{[Op.in]:[1,2,3]}
    },{});
  }
};
