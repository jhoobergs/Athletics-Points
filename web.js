const compression = require('compression');
const express = require('express');
const path = require('path');

const app = express();

app.use(compression());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.use(express.static(path.join(__dirname, 'lib')));
app.use(express.static(path.join(__dirname, 'examples')));

app.get('/', (req, res) => {
  res.redirect('/examples/index.html');
});

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log('App started.');
});
