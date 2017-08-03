const assert = require('assert');
const athletics = require('../lib/athletics');

/* function getEvent(name, val, dim, adj, gender){
  return {
    event: athletics.events[gender][name],
    result: {
      value: val,
      dimension: dim,
      adjustment: adj,
    },
  };
}

function getEventMen(name, val, dim, adj) {
  return getEvent(name, val, dim, adj, 'MEN');
}

function getEventWomen(name, val, dim, adj) {
  return getEvent(name, val, dim, adj, 'WOMEN');
}*/

describe('Age factors', () => {
  describe('Simple rounding tests', () => {
    it('Throw is rounded down', () => {
      let value = athletics.roundFormula.THROW(10.403);
      assert.equal(10.40, value);
      value = athletics.roundFormula.THROW(10.408);
      assert.equal(10.40, value);
      value = athletics.roundFormula.THROW(10.405);
      assert.equal(10.40, value);
    });
    it('Jump is rounded down', () => {
      let value = athletics.roundFormula.JUMP(840.3);
      assert.equal(840, value);
      value = athletics.roundFormula.JUMP(840.8);
      assert.equal(840, value);
      value = athletics.roundFormula.JUMP(840.5);
      assert.equal(840, value);
    });
    it('Run is rounded up', () => {
      let value = athletics.roundFormula.RUN(10.403);
      assert.equal(10.41, value);
      value = athletics.roundFormula.RUN(10.408);
      assert.equal(10.41, value);
      value = athletics.roundFormula.RUN(10.405);
      assert.equal(10.41, value);
    });
  });
});
