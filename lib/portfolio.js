/* eslint-disable func-names */

function Portfolio(name) {
  this.name = name;
  this.stocks = [];
//  this.position = 0;
}

Portfolio.prototype.addStocks = function (stock) {
  this.stocks.push(stock);
};

Portfolio.prototype.getPosition = function () {
  return this.stocks.reduce((acc, val) => (acc + (val.shares * val.pPPS)), 0);
};

module.exports = Portfolio;
