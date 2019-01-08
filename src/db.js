import massive from 'massive';
// import monitor from 'pg-monitor';

class Database {
  async getDb() {
    if (this.db) {
      console.log('return db directly');
      return this.db;
    }

    console.log('db creating...');
    this.db = await massive(
      'postgres://postgres:123456@localhost:5432/minifarm'
    );

    // monitor.attach(this.db);

    console.log('db created.');
    return this.db;
  }
}

export default Database;
