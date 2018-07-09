'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    price: DataTypes.NUMBER
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};