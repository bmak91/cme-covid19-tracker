const express = require('express');
const Knex = require('knex');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./settings.json');

const app = express();
app.use(bodyParser.json(), cors());

const db = Knex({
  client: 'pg',
  connection: config.connection,
  pool: {
    min: 0,
    max: 4,
  },
});

app.use((req, res, next) => {
  req.session = req.session || {};
  req.session.db = db;
  next();
});

const router = require('./routes');
app.use('/api', router);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
