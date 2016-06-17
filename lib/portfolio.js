/* eslint-disable func-names */

function Portfolio(name) {
  this.name = name;
  this.stocks = [];
}

Portfolio.prototype.addStocks = function (stock) {
  this.stocks.push(stock);
};

module.exports = Portfolio;
