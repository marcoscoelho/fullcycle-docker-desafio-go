const mysql = require('mysql');
const { promisify } = require('util');

class DB {
    constructor (config) {
        this.config = config;
        this.setup();
    }

    setup () {
        this.connection = mysql.createConnection(this.config);
    }

    quit () {
        this.connection.end();
    }

    async insertPerson ({ name }) {
        const { insertId } = await this.query(`INSERT IGNORE INTO people (name) values('${name}')`);
        return insertId;
    }

    async getPeople () {
        return await this.query('SELECT * FROM people');
    }

    async insertMigration ({ title }) {
        return await this.query(`INSERT INTO migrations (title) values('${title}')`);
    }

    async deleteMigration ({ title }) {
        try {
            return await this.query(`DELETE FROM migrations WHERE title = '${title}'`);
        } catch (err) {
            await this.handleDeleteMigrationError(err);
        }
    }

    async handleDeleteMigrationError(err) {
        if (err.errno !== 1146) {
            throw err;
        }
    }

    async getMigrations () {
        try {
            return await this.query('SELECT * FROM migrations');
        } catch (err) {
            return [];
        }
    }

    async runMigration(cb) {
        try {
            await this.transaction(cb);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async transaction(cb) {
        try {
            this.connection.beginTransaction();
            await cb();
            this.connection.commit();
        } catch (err) {
            this.connection.rollback();
            throw err;
        }
    }

    async query (sql) {
        const query = promisify(this.connection.query).bind(this.connection);
        const response = await query(sql);

        return response;
    }
}

module.exports = DB;
