import pgp from 'pg-promise';

const db = pgp()('postgres://username:password@host:5432/database');

module.exports.handler = async (event, context) => {
  const now = await db.any('select now()');
  console.log(now);

  const response = {
    statusCode: 200,
    body: JSON.stringify(now)
  };
  return response;
};
