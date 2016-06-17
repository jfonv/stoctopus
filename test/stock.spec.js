/* eslint-disable no-unused-expressions, func-names */

const expect = require('chai').expect;
const Stock = require('../lib/stock');
const nock = require('nock');
const sinon = require('sinon');
let clock;

describe('Stock', () => {
  before(() => {
    clock = sinon.useFakeTimers();
    clock.tick(150);
    nock('http://dev.markitondemand.com/')
    .persist()
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
        expect(result.purchaseDate.getTime()).to.equal(150);
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
  describe('#sell', () => {
    it('should not sell stock if invalid quantity', (done) => {
      const result = new Stock('AAPL');
      result.purchase(50, () => {
        result.sell(60, (sellErr, totalSold) => {
          expect(sellErr.message).to.equal('NOT ENOUGH SHARES MAN');
          expect(result.shares).to.equal(50);
          expect(totalSold).to.equal(0);
          done();
        });
      });
    });
  });
  describe('.getQuote', () => {
    it('should provide current price for symbol', (done) => {
      Stock.getQuote('aapl', (err, stockPrice) => {
        expect(err).to.be.null;
        expect(stockPrice).to.equal(100);
        done();
      });
    });
  });
  after(() => {
    clock.restore();
    nock.cleanAll();
  });
});
