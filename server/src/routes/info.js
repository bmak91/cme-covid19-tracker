const Knex = require('knex');

const handler = async (req, res) => {
  /** @type {Knex} */
  const db = req.session.db;
  const { hash } = req.params;

  try {
    let person = await db
      .first({
        communityId: 'main_community_id',
        community: 'communities.name',
      })
      .from('persons')
      .join('communities', 'persons.main_community_id', 'communities.id')
      .where('persons.key', hash);

    res.send(person || {});
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = handler;
