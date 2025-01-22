'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@gmail.com",
        username: "JohnSmith",
        hashedPassword: bcrypt.hashSync('secret password')
      },
      {
        firstName: 'Garen',
        lastName: 'Darius',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Kayle',
        lastName: 'Morgana',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ,
    {
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      username: 'AliceJ',
      hashedPassword: bcrypt.hashSync('password4')
    },
    {
      firstName: 'Bob',
      lastName: 'Brown',
      email: 'bob.brown@example.com',
      username: 'BobB',
      hashedPassword: bcrypt.hashSync('password5')
    },
    {
      firstName: 'Charlie',
      lastName: 'Davis',
      email: 'charlie.davis@example.com',
      username: 'CharlieD',
      hashedPassword: bcrypt.hashSync('password6')
    },
    {
      firstName: 'Diana',
      lastName: 'Evans',
      email: 'diana.evans@example.com',
      username: 'DianaE',
      hashedPassword: bcrypt.hashSync('password7')
    },
    {
      firstName: 'Eve',
      lastName: 'Foster',
      email: 'eve.foster@example.com',
      username: 'EveF',
      hashedPassword: bcrypt.hashSync('password8')
    },
    {
      firstName: 'Demo',
      lastName: 'User',
      email: 'demo@example.com',
      username: 'demoUser',
      hashedPassword: bcrypt.hashSync('demoPass')
    }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['JohnSmith', 'FakeUser1', 'FakeUser2', 'AliceJ', 'BobB', 'CharlieD', 'DianaE', 'EveF', 'demoUser'] }
    }, {});
  }
};
