'use strict';
const uuidV1 = require('uuid/v1');


module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          id: uuidV1(),
          username: 'test',
          password: 'test',
          email: 'Vasya@petichkin1@induk.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidV1(),
          username: 'test1',
          password: 'test1',
          email: 'Vasya@petichkin2@induk.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidV1(),
          username: 'test2',
          password: 'test2',
          email: 'Vasya@petichkin3@induk.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Users', null, {}),
};
