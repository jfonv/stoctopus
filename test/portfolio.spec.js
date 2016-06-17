/* eslint-disable no-unused-expressions */

const expect = require('chai').expect;
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
    describe('#addStocks', () => {
      it('should add stocks to the portfolio', () => {
        const result = new Portfolio('tech');
        expect(result.name).to.equal('tech');
        result.addStocks(
          { name: 'Microsoft',
            symbol: 'MSFT',
            shares: 100,
            pPPS: 50,
            purchaseDate: 150,
          });
        expect(result.stocks).to.be.length(1);
      });
    });
  });
  describe('#getPosition', () => {
    it('should provide the position (sum) of the whole portfolio', () => {
      const result = new Portfolio('tech');
      expect(result.name).to.equal('tech');
      result.addStocks(
        { name: 'Microsoft',
          symbol: 'MSFT',
          shares: 100,
          pPPS: 50,
          purchaseDate: 150,
        });
      result.addStocks(
        { name: 'Apple',
          symbol: 'AAPL',
          shares: 100,
          pPPS: 100,
          purchaseDate: 152,
        });
      expect(result.getPosition()).to.equal(15000);
      result.stocks[1].shares = 50;
      expect(result.getPosition()).to.equal(10000);
    });
  });
});
