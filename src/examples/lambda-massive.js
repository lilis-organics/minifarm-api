import massive from 'massive';

class Database {
  async getDb() {
    if (this.db) {
      return this.db;
    }

    console.log('db initializing...');
    this.db = await massive('postgres://username:password@host:5432/database');
    console.log('db initialized');
    return this.db;
  }
}

const instance = new Database();

export const handler = async (event, context) => {
  const db = await instance.getDb();
  const now = await db.query('select now()');
  console.log(now);

  const response = {
    statusCode: 200,
    body: JSON.stringify(now),
  };
  return response;
};
