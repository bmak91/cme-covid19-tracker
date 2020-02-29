const Knex = require('knex');
const uuid = require('uuid').v4;

const handler = async (req, res) => {
  /** @type {Knex} */
  const db = req.session.db;
  const { key } = req.params;
  const { existingKey } = req.body;

  const getPersonByKey = key =>
    db
      .first({
        id,
        communityId: 'main_community_id',
        communityName: 'communities.name',
      })
      .from('persons')
      .join('communities', 'persons.main_community_id', 'communities.id')
      .where('persons.key', key || '');

  try {
    if (existingKey) {
      let { id: referrerId } = await getPersonByKey(key);
      let { id: pId } = await getPersonByKey(existingKey);

      await db('persons_persons').insert({
        id: uuid(),
        referrer_id: referrerId,
        person_id: pId,
      });

      return res.send({});
    } else {
      let person = await getPersonByKey(key);

      return res.send(
        (person &&
          person.communityId && {
            id: person.communityId,
            name: person.communityName,
          }) ||
          {}
      );
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = handler;
