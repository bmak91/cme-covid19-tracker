const Knex = require('knex');
const uuid = require('uuid').v4;

const makePersonQueries = require('../../queries/person');

const handler = async (req, res) => {
  /** @type {Knex} */
  const db = req.session.db;
  const { key, community } = req.body;
  let { id: communityId, name } = community;

  const { getPersonByKey } = makePersonQueries(db);

  try {
    let person = key && (await getPersonByKey(key));
    if (!person) return res.status(404).end();

    await db.transaction(async trx => {
      if (!communityId) {
        communityId = uuid();
        await trx('communities').insert({
          id: communityId,
          name,
        });
      }

      await trx('persons_communities').insert({
        id: uuid(),
        person_id: person.id,
        community_id: communityId,
      });
    });

    res.send({ id: communityId, name });
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = handler;
