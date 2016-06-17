/* eslint-disable func-names */

// const Stock = require('../lib/stock');
const Portfolio = require('../lib/portfolio');
const v1 = require('uuid');
const Stock = require('../lib/stock');

function Client(name) {
  this.name = name;
  this.accountNumber = v1.v1();
  this.portfolios = [];
  this.cash = 0;
}


Client.prototype.deposit = function (amount) {
  let retVal = 0;

  if (amount * 1 > 0) {
    this.cash += amount;
    retVal = amount;
  }

  return retVal;
};
Client.prototype.withdraw = function (amount) {
  let retVal = 0;

  if (amount * 1 > 0 && amount <= this.cash) {
    this.cash -= amount;
    retVal = amount;
  }

  return retVal;
};

Client.prototype.purchaseStock = function (symbol, amount, portfolio, cb) {
  let pf;
  let idx = -1;
  const tempStock = new Stock(symbol);
  const purchaseCost = Stock.getQuote(symbol, (err, totalTrans) => {

    this.portfolios.push(new Portfolio(portfolio));
    const x = this.portfolios.length - 1;
    this.portfolios[x].addStocks(tempStock);

    if (purchaseCost <= this.cash) {
      tempStock.purchase(amount, (err2, totalTrans) => {
        this.cash -= totalTrans;
        cb(err2, totalTrans);
      });
    } else {
      cb(new Error('Not enough funds.'), 0);
    }
  }) * amount;

// Look if the array of portfolio has the passed on portfolio if ()
/*  if (this.portfolios.length > 0) {
    this.portfolios.filter((v, i) => {
      if (v.name == portfolio) {
        idx = i;
        console.log(i,'true');
        return true;
      }
      console.log(v.name,portfolio, i);
      return false;
    });

    console.log('idx - ',symbol,':',idx);
    if (idx <= -1) {
      pf = new Portfolio(portfolio);
      this.portfolios.push(portfolio)
    } else {
      pf = this.portfolios[idx];
    }
  } else {
    pf = new Portfolio(portfolio);
    this.portfolios.push(portfolio)
  }*/
};

module.exports = Client;

/*










































*/
