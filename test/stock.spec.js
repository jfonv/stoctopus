/* eslint-disable no-unused-expressions, func-names */

const expect = require('chai').expect;
const Stock = require('../lib/stock');
const nock = require('nock');
// const nock = require('sinon');

describe('Stock', () => {
  beforeEach(() => {
    nock('http://dev.markitondemand.com/')
    .get('/MODApis/Api/v2/Quote/json?symbol=AAPL')
    .reply(200, {
      Name: 'Apple',
      LastPrice: 100,
    });
  });
  describe('constructor', () => {
    it('should create new stock', () => {
      // const result = new Stock('Apple, Inc.','AAPL',10,500);
      const result = new Stock('AAPL');
      // expect(result.name).to.equal('Apple, Inc.');
      expect(result.symbol).to.equal('AAPL');
      // expect(result.shares).to.equal(10);
      // expect(result.purchasePrice).to.equal(500);
    });
  });
  describe('#purchase', () => {
    it('should purchase stock with provided symbol', (done) => {
      // const result = new Stock('Apple, Inc.','AAPL',10,500);
      const result = new Stock('aapl');
      result.purchase(50, (err, totalPaid) => {
        expect(err).to.be.null;
        expect(result.symbol).to.equal('AAPL');
        expect(totalPaid).to.equal(5000);
        expect(result.name).to.equal('Apple');
        expect(result.shares).to.equal(50);
        expect(result.pPPS).to.equal(100);
        // expect(result.purchaseDate.getTime()).to.equal();
        done();
      });
    });
  });
  describe('#sell', () => {
    it('should sell stock with provided symbol', (done) => {
      const result = new Stock('AAPL');
      result.purchase(50, () => {
        result.sell(20, (sellErr, totalSold) => {
          expect(sellErr).to.be.null;
          expect(result.shares).to.equal(30);
          expect(totalSold).to.equal(2000);
          done();
        });
      });
    });
  });
  /*
  describe('#sell', () => {
    it('should sell stock with provided symbol', (done) => {
      const result = new Stock('AAPL');
      result.purchase(50, () => {
        result.sell(20, (sellErr, totalSold) => {
          expect(sellErr).to.be.null;
          expect(result.shares).to.equal(30);
          expect(totalSold).to.equal(2000);
          done();
        });
      });
    });
  });*/
});
