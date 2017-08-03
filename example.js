const athletics = require('./lib/athletics');

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

const m100 = athletics.calculatePoints(getEventMen('100m', 11.87, 's', false));
const long = athletics.calculatePoints(getEventMen('Long Jump', 622, 'cm', false));
const shot = athletics.calculatePoints(getEventMen('Shot', 12.58, 'm', false));
const high = athletics.calculatePoints(getEventMen('High Jump', 184, 'cm', false));
const m400 = athletics.calculatePoints(getEventMen('400m', 51.75, 's', false));

const m110mH = athletics.calculatePoints(getEventMen('110mH', 15.39, 's', false));
const disc = athletics.calculatePoints(getEventMen('Discus', 36.31, 'm', false));
const pole = athletics.calculatePoints(getEventMen('Pole Vault', 370, 'cm', false));
const jav = athletics.calculatePoints(getEventMen('Javelin', 48.30, 'm', false));
const m1500 = athletics.calculatePoints(getEventMen('1500m', 4 * 60 + 35, 's', false));

console.log(m100);
console.log(long);
console.log(shot);
console.log(high);
console.log(m400);
console.log(m100 + long + shot + high + m400);

console.log(m110mH);
console.log(disc);
console.log(pole);
console.log(jav);
console.log(m1500);
console.log(m110mH + disc + pole + jav + m1500);

console.log(m100 + long + shot + high + m400 + m110mH + disc + pole + jav + m1500);
