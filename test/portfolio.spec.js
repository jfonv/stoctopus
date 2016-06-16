/* eslint-disable no-unused-expressions */

const expect = require('chai').expect;
const Stock = require('../lib/stock');
const Portfolio = require('../lib/portfolio');

describe('Portfolio', () => {
  describe('constructor', () => {
    it('should create a new portfolio', () => {
      const result = new Portfolio('tech');
      expect(result.name).to.equal('tech');
      expect(result.stocks).to.deep.equal([]);
    });
  });

  describe('Portfolio', () => {
    describe('addStocks', () => {
      it('should add stocks to the portfolio', () => {
        const result = new Portfolio('tech');
        expect(result.name).to.equal('tech');
        result.addStocks(new Stock('MSFT'));
        expect(result.stocks).to.be.length(1);
      });
    });
  });
});
