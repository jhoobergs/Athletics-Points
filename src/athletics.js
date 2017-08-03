import ageGroups from '../data/age-table.json';

(() => {
  const eventTypes = { RUN: 'RUN', JUMP: 'JUMP', THROW: 'THROW' };

  const pointsFormula = {
    RUN: (a, b, c, T) => a * (b - T) ** c, // T in seconds
    JUMP: (a, b, c, M) => a * (M * 100 - b) ** c, // M in meters
    THROW: (a, b, c, D) => a * (D - b) ** c, // D in meters
  };

  const roundFormula = {
    RUN: T => Math.ceil(T * 100) / 100, // T in seconds
    JUMP: M => Math.floor(M), // M in centimeters
    THROW: D => Math.floor(D * 100) / 100, // D in meters
  };

  const eventsMen = {
    '100m': { a: 25.4347, b: 18.00, c: 1.81, type: eventTypes.RUN, adjustment: 0.24 },
    '200m': { a: 5.8425, b: 38.00, c: 1.81, type: eventTypes.RUN, adjustment: 0.24 },
    '400m': { a: 1.53775, b: 82.00, c: 1.81, type: eventTypes.RUN, adjustment: 0.14 },
    '1500m': { a: 0.03768, b: 480.00, c: 1.85, type: eventTypes.RUN },
    '110mH': { a: 5.74352, b: 28.50, c: 1.92, type: eventTypes.RUN, adjustment: 0.24 },
    'High Jump': { a: 0.8465, b: 75.00, c: 1.42, type: eventTypes.JUMP },
    'Pole Vault': { a: 0.2797, b: 100.00, c: 1.35, type: eventTypes.JUMP },
    'Long Jump': { a: 0.14354, b: 220.00, c: 1.40, type: eventTypes.JUMP },
    Shot: { a: 51.39, b: 1.50, c: 1.05, type: eventTypes.THROW },
    Discus: { a: 12.91, b: 4.00, c: 1.10, type: eventTypes.THROW },
    Javelin: { a: 10.14, b: 7.00, c: 1.08, type: eventTypes.THROW },
    '60m': { a: 58.0150, b: 11.50, c: 1.81, type: eventTypes.RUN, adjustment: 0.24 },
    '1000m': { a: 0.08713, b: 305.50, c: 1.85, type: eventTypes.RUN },
    '60mH': { a: 20.5173, b: 15.50, c: 1.92, type: eventTypes.RUN, adjustment: 0.24 },
  };

  const eventsWomen = {
    '200m': { a: 4.99087, b: 42.50, c: 1.81, type: eventTypes.RUN, adjustment: 0.24 },
    '800m': { a: 0.11193, b: 254.00, c: 1.88, type: eventTypes.RUN },
    '100mH': { a: 9.23076, b: 26.70, c: 1.835, type: eventTypes.RUN, adjustment: 0.24 },
    'High Jump': { a: 1.84523, b: 75.00, c: 1.348, type: eventTypes.JUMP },
    'Long Jump': { a: 0.188807, b: 210.00, c: 1.41, type: eventTypes.JUMP },
    Shot: { a: 56.0211, b: 1.50, c: 1.05, type: eventTypes.THROW },
    Javelin: { a: 15.9803, b: 3.80, c: 1.04, type: eventTypes.THROW },
    '100m': { a: 17.8570, b: 21.0, c: 1.81, type: eventTypes.RUN, adjustment: 0.24 },
    '400m': { a: 1.34285, b: 91.7, c: 1.81, type: eventTypes.RUN, adjustment: 0.14 },
    '1500m': { a: 0.02883, b: 535, c: 1.88, type: eventTypes.RUN },
    'Pole Vault': { a: 0.44125, b: 100.00, c: 1.35, type: eventTypes.JUMP },
    Discus: { a: 12.3311, b: 3.00, c: 1.10, type: eventTypes.THROW },
    '60mH': { a: 20.0479, b: 17.00, c: 1.835, type: eventTypes.RUN, adjustment: 0.24 },
  };

  Object.keys(eventsMen).forEach((key) => {
    eventsMen[key].name = key;
  });

  Object.keys(eventsWomen).forEach((key) => {
    eventsWomen[key].name = key;
  });

  const events = {
    MEN: eventsMen,
    WOMEN: eventsWomen,
  };

  function resolveResult(result, event, ageGroup) {
    let resolvedResult = result.value;

    // TODO: convert dimensions
    if (result.dimension === 'cm') {
      resolvedResult /= 100;
    }

    if (result.adjustment) {
      resolvedResult += event.adjustment || 0;
    }

    // Age factor
    if (ageGroup) {
      resolvedResult *= ageGroup[event.name];
      resolvedResult = roundFormula[event.type](resolvedResult);
    }

    return resolvedResult;
  }

  function calculatePoints(options) {
    const resolvedResult = resolveResult(options.result, options.event, options.ageGroup);
    if (!resolvedResult) {
      return undefined;
    }
    return Math.floor(pointsFormula[options.event.type](options.event.a,
     options.event.b, options.event.c, resolvedResult));
  }

  function updateSums(sums, eventName, points) {
    sums.forEach((sum) => {
      if (sum[eventName] || sum[eventName] === 0) {
        sum[eventName] = (points || 0);
        sum.dom.innerHTML = Object.keys(sum).filter(key => key !== 'dom').map(key => sum[key]).reduce((prev, current) => prev + current);
      }
    });
  }

  function addListeners() {
    console.info('adding listeners');
    const containers = document.querySelectorAll('.athletics-container');
    containers.forEach((container) => {
      const gender = container.getAttribute('data-athletics-gender').toUpperCase();
      let sums = Array.from(container.querySelectorAll('.athletics-sum'));
      sums = sums.map((sum) => {
        const item = { dom: sum };
        const sumEvents = JSON.parse(sum.getAttribute('data-athletics-sum-events'));
        if (sumEvents) {
          sumEvents.forEach((event) => {
            item[event] = 0;
          });
        }
        return item;
      },
      );
      container.querySelectorAll('.athletics-event').forEach((eventHTML) => {
        const input = eventHTML.querySelector('.athletics-event-result');
        const output = eventHTML.querySelector('.athletics-event-points');
        input.addEventListener('input', () => {
          const eventName = eventHTML.getAttribute('data-athletics-event');
          if (output) {
            const points = calculatePoints({
              event: events[gender][eventName],
              result: { value: parseFloat(input.value) },
            });
            output.innerHTML = (points || 0);
            updateSums(sums, eventName, points);
          } else {
            console.warn(`No points field found for ${eventName}`);
          }
        });
      });
    });
  }

  function init() {
    addListeners();
  }

  module.exports = {
    init,
    events,
    ageGroups,
    calculatePoints,
  };
  if (process.env.TESTING) {
    module.exports.roundFormula = roundFormula;
  }
})();
