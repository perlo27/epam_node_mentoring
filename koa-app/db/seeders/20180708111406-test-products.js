'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Products', [
        {
          id: 1,
          name: 'Supreme T-Shirt',
          brand: 'Supreme',
          price: 99.99
        },
        {
          id: 2,
          name: 'Supreme jeans',
          brand: 'Supreme',
          price: 199.99
        },
        {
          id: 3,
          name: 'Supreme cap',
          brand: 'Supreme',
          price: 399.99
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Products', null, {});
  }
};
