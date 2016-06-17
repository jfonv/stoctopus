const v1 = require('uuid');
//const Stock = require('../lib/stock');

function Client(name) {
  this.name = name;
  this.accountNumber = v1.v1();
  this.portfolios = [];
  this.cash = 0;
}



module.exports = Client;
