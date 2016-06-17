/* eslint-disable func-names */

const request = require('request');

function Stock(symbol) {
  this.name = '';
  this.symbol = symbol.toUpperCase();
  this.shares = 0;
  this.pPPS = 0;
  this.purchaseDate = null;
}

Stock.prototype.purchase = function (amount, hollaback) {
  const url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${this.symbol}`;

  request({ url, json: true }, (err, rsp, body) => {
    this.name = body.Name;
    this.shares = amount;
    this.pPPS = body.LastPrice;
    this.purchaseDate = new Date();
    hollaback(err, this.pPPS * this.shares);
  });
};

Stock.prototype.sell = function (amount, hollaback) {
  if (amount > this.shares) return hollaback(new Error('NOT ENOUGH SHARES MAN'), 0);

  const url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${this.symbol}`;

  request({ url, json: true }, (err, rsp, body) => {
    this.shares -= amount;
    hollaback(err, body.LastPrice * amount);
  });
  return null;
};

Stock.getQuote = function (symbol, hollaback) {
  const symbolCap = symbol.toUpperCase();
  const url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${symbolCap}`;

  request({ url, json: true }, (err, rsp, body) => {
    hollaback(err, body.LastPrice);
  });
};

module.exports = Stock;
