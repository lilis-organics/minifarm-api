import massive from 'massive';
// import monitor from 'pg-monitor';

class Database {
  init() {
    this.getDb();
    return this;
  }

  getDb() {
    if (this.db) {
      // console.log('return db directly');
      return this.db;
    }

    console.log('db initializing...');

    const cn = {
      connectionString: process.env.database,
      // poolSize: 10
    };

    this.db = massive(cn, {
      documentPkType: 'uuid',
      uuidVersion: 'v1mc',
    });

    // monitor.attach(this.db);

    console.log('db initialized');
    return this.db;
  }
}

export default Database;
