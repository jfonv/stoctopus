/* eslint-disable func-names */

const request = require('request');

function Stock(symbol) {
  this.name = '';
  this.symbol = symbol;
  this.shares = 0;
  this.pPPS = 0;
}

Stock.prototype.purchase = function (amount, hollaback) {
  const url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${this.symbol}`;

  request({ url, json: true }, (err, rsp, body) => {
    this.name = body.Name;
    this.shares = amount;
    this.pPPS = body.LastPrice;
    hollaback(err, this.pPPS * this.shares);
  });
};

Stock.prototype.sell = function (amount, hollaback) {
  const url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${this.symbol}`;

  request({ url, json: true }, (err, rsp, body) => {
    this.shares -= amount;
    hollaback(err, body.LastPrice * amount);
  });
};

module.exports = Stock;
