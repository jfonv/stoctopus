/* eslint-disable no-unused-expressions */

const expect = require('chai').expect;
// const Stock = require('../lib/stock');
// const Portfolio = require('../lib/portfolio');
// const Client = require('../lib/client');
const Brokerage = require('../lib/brokerage');

describe('Brokerage', () => {
  describe('constructor', () => {
    it('should create a new brokerage', () => {
      const result = new Brokerage('Wells Fargo');
      expect(result.name).to.equal('Wells Fargo');
      expect(result.clients).to.deep.equal([]);
    });
  });
});
