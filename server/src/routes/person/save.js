const Knex = require('knex');
const uuid = require('uuid').v4;
const crypto = require('crypto');

const handler = async (req, res) => {
  /** @type {Knex} */
  const db = req.session.db;
  let { key, answers, phone } = req.body;

  try {
    let pId;
    let privateKey;
    let publicKey;
    if (key) {
      let person = await db
        .first({ id: 'id', privateKey: 'key', publicKey: 'public_key' })
        .from('persons')
        .where('persons.key', key);

      if (!person) return res.status(404).end();

      ({ id: pId, privateKey, publicKey } = person);
    } else {
      pId = uuid();
      privateKey = crypto.randomBytes(20).toString('hex');
      publicKey = crypto.randomBytes(20).toString('hex');

      await db('persons').insert({
        id: pId,
        key: privateKey,
        public_key: publicKey,
      });
    }

    await db('answers').insert({
      id: uuid(),
      person_id: pId,
      ...Object.fromEntries(answers.map((a, ind) => [`q${ind + 1}`, a])),
    });

    res.send({ privateKey, publicKey });
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

module.exports = handler;
