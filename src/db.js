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

    const conn = {
      connectionString: process.env.database,
      // poolSize: 10
    };

    const instance = massive(conn, {
      documentPkType: 'uuid',
      uuidVersion: 'v1mc',
    });

    // monitor.attach(instance);

    this.db = instance;

    console.log('db initialized');
    return this.db;
  }
}

export default Database;
