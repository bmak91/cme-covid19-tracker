const Knex = require('knex');
const uuid = require('uuid').v4;
const crypto = require('crypto');

const handler = async (req, res) => {
  /** @type {Knex} */
  const db = req.session.db;
  let { key, community, answers, phone } = req.body;
  let { id: communityId, name: communityName } = community;

  try {
    let referrerId;

    if (!communityId && communityName) {
      // If communityId is missing,
      // create a new community

      communityId = uuid();
      await db('communities').insert({
        id: communityId,
        name: communityName,
      });
    } else if (!!communityId && !!key) {
      // If we're being sent a communityId,
      // make sure it matches the key

      let person = await db
        .first({
          referrerId: 'persons.id',
          communityId: 'main_community_id',
          communityName: 'communities.name',
        })
        .from('persons')
        .join('communities', 'persons.main_community_id', 'communities.id')
        .where('persons.key', key);

      person && ({ communityName, communityId, referrerId } = person);
    } else {
      return res.status(400).send('Community not specified');
    }

    let newKey;
    await db.transaction(async trx => {
      try {
        let pId = uuid();
        newKey = crypto.randomBytes(20).toString('hex');
        await trx('persons').insert({
          id: pId,
          main_community_id: communityId,
          key: newKey,
        });

        if (referrerId) {
          await trx('persons_persons').insert({
            id: uuid(),
            referrer_id: referrerId,
            person_id: pId,
          });
        }

        await trx('persons_communities').insert({
          id: uuid(),
          person_id: pId,
          community_id: communityId,
        });

        await trx('answers').insert({
          id: uuid(),
          person_id: pId,
          ...Object.fromEntries(answers.map((a, ind) => [`q${ind + 1}`, !!a])),
        });
      } catch (e) {
        console.error(e);
      }

      res.send({ newKey });
    });
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

module.exports = handler;
