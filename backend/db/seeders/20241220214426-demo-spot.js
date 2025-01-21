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
      name: 'Redwood Cabin',
      description: 'A rustic cabin that feels like home, surrounded by redwoods that keep you connected to nature.',
      price: 1000.00
      },
      {
      ownerId: 3,
      address: '145 Desert Rd',
      city: 'Desert',
      state: 'AZ',
      country: 'USA',
      name: 'Desert Oasis',
      description: 'An oasis in the middle of the desert, perfect for a quiet retreat.',
      price: 6000.00
      },
      {
      ownerId: 4,
      address: '2840 Forest Rd',
      city: 'Forest',
      state: 'OR',
      country: 'USA',
      name: 'Forest Cabin',
      description: 'A cabin in the middle of the forest, perfect for a quiet retreat.',
      price: 3000.00
      },
      {
      ownerId: 4,
      address: '1042 Mountain Rd',
      city: 'Mountain',
      state: 'CO',
      country: 'USA',
      name: 'Mountain Cabin',
      description: 'A rustic cabin that feels like home, surrounded by redwoods that keep you connected to nature.',
      price: 2000.00
      },
      {
      ownerId: 4,
      address: '5678 Pine St',
      city: 'Pineville',
      state: 'WA',
      country: 'USA',
      name: 'Pine Cabin',
      description: 'A cozy cabin surrounded by pine trees, perfect for a winter retreat.',
      price: 1500.00
      },
      {
      ownerId: 5,
      address: '7890 Maple St',
      city: 'Mapleton',
      state: 'VT',
      country: 'USA',
      name: 'Maple Cabin',
      description: 'A charming cabin surrounded by maple trees, perfect for a fall getaway.',
      price: 1200.00
      },
      {
      ownerId: 5,
      address: '1234 Birch St',
      city: 'Birchwood',
      state: 'NH',
      country: 'USA',
      name: 'Birch Cabin',
      description: 'A quaint cabin surrounded by birch trees, perfect for a spring retreat.',
      price: 1100.00
      },
      {
      ownerId: 6,
      address: '5678 Oak St',
      city: 'Oakville',
      state: 'ME',
      country: 'USA',
      name: 'Oak Cabin',
      description: 'A rustic cabin surrounded by oak trees, perfect for a summer getaway.',
      price: 1300.00
      },
      {
      ownerId: 6,
      address: '7890 Cedar St',
      city: 'Cedarton',
      state: 'NY',
      country: 'USA',
      name: 'Cedar Cabin',
      description: 'A beautiful cabin surrounded by cedar trees, perfect for a peaceful retreat.',
      price: 1400.00
      },
      {
      ownerId: 7,
      address: '1234 Spruce St',
      city: 'Spruceton',
      state: 'PA',
      country: 'USA',
      name: 'Spruce Cabin',
      description: 'A lovely cabin surrounded by spruce trees, perfect for a relaxing getaway.',
      price: 1600.00
      },
      {
      ownerId: 7,
      address: '5678 Fir St',
      city: 'Firtown',
      state: 'MA',
      country: 'USA',
      name: 'Fir Cabin',
      description: 'A delightful cabin surrounded by fir trees, perfect for a cozy retreat.',
      price: 1700.00
      },
      {
      ownerId: 8,
      address: '7890 Elm St',
      city: 'Elmsville',
      state: 'CT',
      country: 'USA',
      name: 'Elm Cabin',
      description: 'A charming cabin surrounded by elm trees, perfect for a serene getaway.',
      price: 1800.00
      },
      {
      ownerId: 8,
      address: '1234 Willow St',
      city: 'Willowtown',
      state: 'RI',
      country: 'USA',
      name: 'Willow Cabin',
      description: 'A peaceful cabin surrounded by willow trees, perfect for a tranquil retreat.',
      price: 1900.00
      },
      {
      ownerId: 8,
      address: '5678 Aspen St',
      city: 'Aspenville',
      state: 'CO',
      country: 'USA',
      name: 'Aspen Cabin',
      description: 'A beautiful cabin surrounded by aspen trees, perfect for a mountain getaway.',
      price: 2000.00
      },
      {
      ownerId: 8,
      address: '7890 Cypress St',
      city: 'Cypresstown',
      state: 'FL',
      country: 'USA',
      name: 'Cypress Cabin',
      description: 'A lovely cabin surrounded by cypress trees, perfect for a coastal retreat.',
      price: 2100.00
      },
      {
      ownerId: 8,
      address: '1234 Redwood St',
      city: 'Redwood City',
      state: 'CA',
      country: 'USA',
      name: 'Redwood Retreat',
      description: 'A stunning cabin surrounded by redwood trees, perfect for a nature retreat.',
      price: 2200.00
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId:{[Op.in]:[1,2,3,4,5,6,7,8]}
    },{});
  }
};
