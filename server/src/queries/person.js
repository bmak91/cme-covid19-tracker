const Knex = require('knex');

/** @type {(db: Knex, key: string, public: boolean) => Knex} */
const getPersonByKey = (db, key, public = false) => {
  if (key === undefined) return;
  return db
    .first({
      id: 'persons.id',
    })
    .from('persons')
    .where(`persons.${public ? 'public_' : ''}key`, key);
};

const make = db => ({
  getPersonByKey: (...params) => getPersonByKey(db, ...params),
});

module.exports = make;
