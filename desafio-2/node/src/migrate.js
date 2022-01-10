const Config =require('./config');
const DB =require('./db');
const Migrations = require('./lib/migrations');

!(async (migrationDir, action) => {
    const db = new DB(Config.get('mysql'));
    const migrations = new Migrations(db, migrationDir);

    await migrations.handle(action);
})(
    process.env.MIGRATIONS_DIR || './migrations/',
    process.argv[2] || 'run'
);

