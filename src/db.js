import massive from 'massive';
import monitor from 'pg-monitor';

let db;

export default function() {
  if (db) {
    return db;
  }

  return massive('postgres://postgres:123456@localhost:5432/minifarm', {
    scripts: './db',
    documentPkType: 'uuid',
    uuidversion: 'v4'
  }).then(instance => {
    db = instance;
    monitor.attach(db.driverConfig);
    return Promise.resolve(db);
  });
}
