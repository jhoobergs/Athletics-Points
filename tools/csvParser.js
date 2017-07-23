const fs = require('fs');

const delimiter = ';';

const stateEnum = {
  NEW_BLOCK: 0,
  BLOCK_HEADER: 1,
  BLOCK: 2,
};

function rowToList(row) {
  const list = row.split(delimiter);
  // list[0] = list[0].substring(0, list[0].length);
  // list[list.length - 1] = list[list.length - 1].substring(0, list[list.length - 1].length - 1);
  return list;
}

function increaseState(state) {
  return (state + 1) % 3;
}

function getEvent(row, currentColumns) {
  const result = {};
  const rowItems = rowToList(row);
  for (let i = 0; i < currentColumns.length; i++) {
    result[currentColumns[i]] = rowItems[i];
  }
  return result;
}

function parseCSV(csv, lineEnding) {
  let state = stateEnum.NEW_BLOCK;
  const rows = csv.split(`${lineEnding}\n`);
  const events = [];
  let currentColumns = [];

  rows.forEach((row) => {
    if (state === stateEnum.NEW_BLOCK) {
      state = increaseState(state);
    } else if (state === stateEnum.BLOCK_HEADER) {
      currentColumns = rowToList(row);
      state = increaseState(state);
    } else if (state === stateEnum.BLOCK) {
      if (row === '') {
        state = increaseState(state);
      } else {
        events.push(getEvent(row, currentColumns));
      }
    }
  });

  return events;
}

fs.readFile('../data/age-table.csv', 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }

  const parsed = parseCSV(data, '');
  const formatted = {
    MEN: {},
    WOMEN: {},
  };

  for (let age = 35; age <= 100; age += 5) {
    formatted.MEN[`M${age}`] = {};
    formatted.WOMEN[`W${age}`] = {};
  }

  // console.log(parsed);
  parsed.forEach((item) => {
    // console.log(item);
    if (item.MEN) {
      const val = item.MEN;
      delete item.MEN;

      Object.keys(formatted.MEN).forEach((age) => {
        // console.log(age);
        if (item[age] !== '-' && item[age] !== '') {
          formatted.MEN[age][val] = item[age];
        }
      });
    } else if (item.WOMEN) {
      const val = item.WOMEN;
      delete item.WOMEN;

      Object.keys(formatted.WOMEN).forEach((age) => {
        if (item[age] !== '-' && item[age] !== '') {
          formatted.WOMEN[age][val] = item[age];
        }
      });
    }
  });
  fs.writeFile('../data/age-table.json', JSON.stringify(formatted), (err2) => {
    if (err2) {
      return console.log(err2);
    }

    console.log('The file was saved!');
  });
  return true;
});
