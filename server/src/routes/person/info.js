const Knex = require('knex');
const uuid = require('uuid').v4;

const makePersonQueries = require('../../queries/person');

// TODO: return risk assessment

const handler = async (req, res) => {
  /** @type {Knex} */
  const db = req.session.db;
  const { referrerKey } = req.params;
  const { existingKey } = req.body;

  const { getPersonByKey } = makePersonQueries(db);

  try {
    let referrer = referrerKey && getPersonByKey(referrerKey, true);
    let person = existingKey && getPersonByKey(existingKey);

    console.log('referrer', referrer.toQuery(), referrerKey);
    console.log('person', person.toQuery(), existingKey);

    referrer = await referrer;
    person = await person;

    if (referrer && person) {
      await db('persons_persons').insert({
        id: uuid(),
        referrer_id: referrer.id,
        person_id: person.id,
      });

      return res.send('connection added.');
    }

    return res.send('');
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

module.exports = handler;
