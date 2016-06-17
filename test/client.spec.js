/* eslint-disable no-unused-expressions */

const expect = require('chai').expect;
const Stock = require('../lib/stock');
const Portfolio = require('../lib/portfolio');
const Client = require('../lib/client');
const nock = require('nock');
const sinon = require('sinon');

describe('Client', () => {
  describe('constructor', () => {
    it('should create a new client', () => {
      const result = new Client('Bob');
      expect(result.name).to.equal('Bob');
      expect(result.portfolios).to.deep.equal([]);
      expect(result.cash).to.equal(0);
      expect(result.accountNumber).to.have.length(36);
    });
  });
  describe('#deposit', () => {
    it('should create deposit positive numbers and nothing else', () => {
      const client = new Client('Bob');
      const result = client.deposit(500000);
      expect(client.cash).to.equal(500000);
      expect(result).to.equal(500000);
      const result1 = client.deposit(-20000);
      expect(client.cash).to.equal(500000);
      expect(result1).to.equal(0);
    });
  });
  describe('#withdraw', () => {
    it('should withdraw positive numbers when request is less than cash', () => {
      const client = new Client('Bob');
      client.deposit(500000);
      const result1 = client.withdraw(20000);
      expect(client.cash).to.equal(480000);
      expect(result1).to.equal(20000);
    });
  });

  describe('#purchaseStock', () => {
    before(() => {
      nock('http://dev.markitondemand.com/')
      .persist()
      .get('/MODApis/Api/v2/Quote/json?symbol=AAPL')
      .reply(200, {
        Name: 'Apple',
        LastPrice: 100,
      });
    });
    it('should purchase a stock for a client', (done) => {
      const client = new Client('Bob');
      client.deposit(50000);
      /* client.purchaseStock('aapl', 50, 'Tech');
      client.purchaseStock('MSFT', 50, 'Tech');
      client.purchaseStock('mon', 50, 'Agro');*/
      expect(client.portfolios).to.be.length(0);
      client.purchaseStock('aapl', 50, 'Tech', (err, totalpurchaseprice) => {
        expect(err).to.be.null;
        expect(client.cash).to.equal(45000);
        expect(totalpurchaseprice).to.equal(5000);
        expect(client.portfolio).to.be.length(1);
        done();
      });
    });
    it('should not allow purchase a stock for a client if cash value is below', (done) => {
      const client = new Client('Bob');
      client.deposit(500);
      /* client.purchaseStock('aapl', 50, 'Tech');
      client.purchaseStock('MSFT', 50, 'Tech');
      client.purchaseStock('mon', 50, 'Agro');*/
      expect(client.portfolios).to.be.length(0);
      client.purchaseStock('aapl', 50, 'Tech', (err, totalpurchaseprice) => {
        expect(err.message).to.equal('Not enough funds.');
        expect(client.cash).to.equal(500);
        expect(totalpurchaseprice).to.equal(0);
        expect(client.portfolios).to.be.length(0);
        console.log('joe:',totalpurchaseprice);
        done();
      });
    });
    after(() => {
      nock.cleanAll();
    });
  });

  /*
  describe('constructor', () => {
    it('should create a new client', () => {
      const result = new Client('tech');
      expect(result.name).to.equal('tech');
      expect(result.portfolios).to.deep.equal([]);
      expect(result.cash).to.equal(0);
      expect(result.accountNumber).to.have.length(36);
    });
  });
  */
});
