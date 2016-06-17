/* eslint-disable func-names */

const Stock = require('../lib/stock');

function Portfolio(name) {
  this.name = name;
  this.stocks = [];
}

Portfolio.prototype.addStocks = function (stock) {
  return this.stocks.push(stock);
};

Portfolio.prototype.getPosition = function () {
  return this.stocks.reduce((acc, val) => (acc + (val.shares * val.pPPS)), 0);
};


module.exports = Portfolio;
