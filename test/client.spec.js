/* eslint-disable no-unused-expressions */

const expect = require('chai').expect;
// const Stock = require('../lib/stock');
// const Portfolio = require('../lib/portfolio');
const Client = require('../lib/client');

describe('Client', () => {
  describe('constructor', () => {
    it('should create a new client', () => {
      const result = new Client('tech');
      expect(result.name).to.equal('tech');
      expect(result.portfolios).to.deep.equal([]);
      expect(result.cash).to.equal(0);
      expect(result.accountNumber).to.have.length(36);
    });
  });
});
