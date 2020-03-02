const Knex = require('knex');

const handler = async (req, res) => {
  /** @type {Knex} */
  const db = req.session.db;
  let { search } = req.query;

  try {
    let q = db
      .select('id', 'name')
      .from('communities')
      .whereRaw('name LIKE ?', search + '%')
      .limit(5);

    console.log(q.toQuery());
    let results = await q;

    res.send({ results });
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = handler;
