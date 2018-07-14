'use strict';
const uuidV1 = require('uuid/v1');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Products',
      [
        {
          id: uuidV1(),
          name: 'Supreme T-Shirt',
          brand: 'Supreme',
          price: 99.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidV1(),
          name: 'Supreme jeans',
          brand: 'Supreme',
          price: 199.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidV1(),
          name: 'Supreme cap',
          brand: 'Supreme',
          price: 399.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  },
};
