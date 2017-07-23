const assert = require('assert');
const athletics = require('../lib/athletics');

function getEventMen(name, val, dim, adj) {
  return {
    event: athletics.events.MEN[name],
    result: {
      value: val,
      dimension: dim,
      adjustment: adj,
    },
  };
}

describe('Decathlon Men', () => {
  describe('100m', () => {
    it('Not Adjusted', () => {
      let event = getEventMen('100m', 10.40, 's', false);
      assert.equal(999, athletics.calculatePoints(event));
      event = getEventMen('100m', 10.62, 's', false);
      assert.equal(947, athletics.calculatePoints(event));
      event = getEventMen('100m', 10.60, 's', false);
      assert.equal(952, athletics.calculatePoints(event));
      event = getEventMen('100m', 10.72, 's', false);
      assert.equal(924, athletics.calculatePoints(event));
    });
    it('Adjusted', () => {
      const event = getEventMen('100m', 10.40, 's', true);
      assert.equal(942, athletics.calculatePoints(event));
    });
  });
  describe('400m', () => {
    it('Not Adjusted', () => {
      let event = getEventMen('400m', 47.74, 's', false);
      assert.equal(922, athletics.calculatePoints(event));
      event = getEventMen('400m', 46.23, 's', false);
      assert.equal(997, athletics.calculatePoints(event));
      event = getEventMen('400m', 46.21, 's', false);
      assert.equal(998, athletics.calculatePoints(event));
    });
    it('Adjusted', () => {
      const event = getEventMen('400m', 47.60, 's', true);
      assert.equal(922, athletics.calculatePoints(event));
    });
  });
  describe('1500m', () => {
    it('Not Adjusted', () => {
      let event = getEventMen('1500m', 4 * 60 + 35.13, 's', false);
      assert.equal(711, athletics.calculatePoints(event));
      event = getEventMen('1500m', 4 * 60 + 29.58, 's', false);
      assert.equal(747, athletics.calculatePoints(event));
      event = getEventMen('1500m', 4 * 60 + 29.05, 's', false);
      assert.equal(751, athletics.calculatePoints(event));
    });
    it('Adjusted', () => {
      const event = getEventMen('1500m', 4 * 60 + 35.13, 's', true);
      assert.equal(711, athletics.calculatePoints(event));
    });
  });
  describe('110mH', () => {
    it('Not Adjusted', () => {
      let event = getEventMen('110mH', 13.80, 's', false);
      assert.equal(1000, athletics.calculatePoints(event));
      event = getEventMen('110mH', 14.40, 's', false);
      assert.equal(924, athletics.calculatePoints(event));
      event = getEventMen('110mH', 14.34, 's', false);
      assert.equal(931, athletics.calculatePoints(event));
    });
    it('Adjusted', () => {
      const event = getEventMen('110mH', 13.56, 's', true);
      assert.equal(1000, athletics.calculatePoints(event));
    });
  });
  describe('High Jump', () => {
    it('Not Adjusted', () => {
      let event = getEventMen('High Jump', 200, 'cm', false);
      assert.equal(803, athletics.calculatePoints(event));
      event = getEventMen('High Jump', 203, 'cm', false);
      assert.equal(831, athletics.calculatePoints(event));
      event = getEventMen('High Jump', 215, 'cm', false);
      assert.equal(944, athletics.calculatePoints(event));
    });
    it('Adjusted', () => {
      const event = getEventMen('High Jump', 200, 'cm', true);
      assert.equal(803, athletics.calculatePoints(event));
    });
  });
  describe('Pole Vault', () => {
    it('Not Adjusted', () => {
      let event = getEventMen('Pole Vault', 500, 'cm', false);
      assert.equal(910, athletics.calculatePoints(event));
      event = getEventMen('Pole Vault', 540, 'cm', false);
      assert.equal(1035, athletics.calculatePoints(event));
      event = getEventMen('Pole Vault', 470, 'cm', false);
      assert.equal(819, athletics.calculatePoints(event));
    });
    it('Adjusted', () => {
      const event = getEventMen('Pole Vault', 500, 'cm', true);
      assert.equal(910, athletics.calculatePoints(event));
    });
  });
  describe('Long Jump', () => {
    it('Not Adjusted', () => {
      let event = getEventMen('Long Jump', 807, 'cm', false);
      assert.equal(1079, athletics.calculatePoints(event));
      event = getEventMen('Long Jump', 763, 'cm', false);
      assert.equal(967, athletics.calculatePoints(event));
      event = getEventMen('Long Jump', 759, 'cm', false);
      assert.equal(957, athletics.calculatePoints(event));
    });
    it('Adjusted', () => {
      const event = getEventMen('Long Jump', 807, 'cm', true);
      assert.equal(1079, athletics.calculatePoints(event));
    });
  });
  describe('Shot Put', () => {
    it('Not Adjusted', () => {
      let event = getEventMen('Shot', 16.57, 'm', false);
      assert.equal(886, athletics.calculatePoints(event));
      event = getEventMen('Shot', 14.90, 'm', false);
      assert.equal(784, athletics.calculatePoints(event));
      event = getEventMen('Shot', 15.41, 'm', false);
      assert.equal(815, athletics.calculatePoints(event));
    });
    it('Adjusted', () => {
      const event = getEventMen('Shot', 16.57, 'm', true);
      assert.equal(886, athletics.calculatePoints(event));
    });
  });
  describe('Discus Throw', () => {
    it('Not Adjusted', () => {
      let event = getEventMen('Discus', 45.51, 'm', false);
      assert.equal(777, athletics.calculatePoints(event));
      event = getEventMen('Discus', 43.40, 'm', false);
      assert.equal(734, athletics.calculatePoints(event));
      event = getEventMen('Discus', 46.96, 'm', false);
      assert.equal(807, athletics.calculatePoints(event));
    });
    it('Adjusted', () => {
      const event = getEventMen('Discus', 45.51, 'm', true);
      assert.equal(777, athletics.calculatePoints(event));
    });
  });
  describe('Javelin Throw', () => {
    it('Not Adjusted', () => {
      let event = getEventMen('Javelin', 68.53, 'm', false);
      assert.equal(867, athletics.calculatePoints(event));
      event = getEventMen('Javelin', 67.01, 'm', false);
      assert.equal(844, athletics.calculatePoints(event));
      event = getEventMen('Javelin', 54.61, 'm', false);
      assert.equal(657, athletics.calculatePoints(event));
    });
    it('Adjusted', () => {
      const event = getEventMen('Javelin', 68.53, 'm', true);
      assert.equal(867, athletics.calculatePoints(event));
    });
  });
});
describe('Pentathlon Men (parts not in decathlon)', () => {
  describe('200m', () => {
    it('Not Adjusted', () => {
      let event = getEventMen('200m', 23.80, 's', false);
      assert.equal(711, athletics.calculatePoints(event));
      event = getEventMen('200m', 25.24, 's', false);
      assert.equal(586, athletics.calculatePoints(event));
      event = getEventMen('200m', 25.26, 's', false);
      assert.equal(584, athletics.calculatePoints(event));
      event = getEventMen('200m', 26.52, 's', false);
      assert.equal(484, athletics.calculatePoints(event));
    });
    it('Adjusted', () => {
      const event = getEventMen('200m', 23.56, 's', true);
      assert.equal(711, athletics.calculatePoints(event));
    });
  });
});
describe('Indoor Heptathlon Men (parts not in decathlon)', () => {
  describe('60m', () => {
    it('Not Adjusted', () => {
      let event = getEventMen('60m', 6.94, 's', false);
      assert.equal(904, athletics.calculatePoints(event));
      event = getEventMen('60m', 7.03, 's', false);
      assert.equal(872, athletics.calculatePoints(event));
      event = getEventMen('60m', 7.19, 's', false);
      assert.equal(816, athletics.calculatePoints(event));
      event = getEventMen('60m', 7.35, 's', false);
      assert.equal(762, athletics.calculatePoints(event));
    });
    it('Adjusted', () => {
      const event = getEventMen('60m', 6.95, 's', true);
      assert.equal(816, athletics.calculatePoints(event));
    });
  });
  describe('1000m', () => {
    it('Not Adjusted', () => {
      let event = getEventMen('1000m', 2 * 60 + 38.23, 's', false);
      assert.equal(893, athletics.calculatePoints(event));
      event = getEventMen('1000m', 2 * 60 + 42.32, 's', false);
      assert.equal(848, athletics.calculatePoints(event));
      event = getEventMen('1000m', 2 * 60 + 45, 's', false);
      assert.equal(819, athletics.calculatePoints(event));
      event = getEventMen('1000m', 2 * 60 + 54.25, 's', false);
      assert.equal(722, athletics.calculatePoints(event));
    });
    it('Adjusted', () => {
      const event = getEventMen('1000m', 2 * 60 + 54.25, 's', true);
      assert.equal(722, athletics.calculatePoints(event));
    });
  });
  describe('60mH', () => {
    it('Not Adjusted', () => {
      let event = getEventMen('60mH', 7.78, 's', false);
      assert.equal(1038, athletics.calculatePoints(event));
      event = getEventMen('60mH', 7.97, 's', false);
      assert.equal(989, athletics.calculatePoints(event));
      event = getEventMen('60mH', 8.18, 's', false);
      assert.equal(937, athletics.calculatePoints(event));
      event = getEventMen('60mH', 8.50, 's', false);
      assert.equal(860, athletics.calculatePoints(event));
    });
    it('Adjusted', () => {
      const event = getEventMen('60mH', 7.73, 's', true);
      assert.equal(989, athletics.calculatePoints(event));
    });
  });
});
