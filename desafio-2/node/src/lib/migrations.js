const fs = require('fs');
const path = require('path');

class Migrations {
    constructor(db, dir) {
        this.db = db;
        this.migrations = [];
        this.migrationsDirectory = dir;
        this.migrationsPath = path.join(__dirname, '../', dir);
    }

    async handle(action) {
        try {
            console.info(`# Migration script performing "${action}"`);

            await this.prepareMigrations();

            switch (action) {
                case 'status': await this.list(); break;
                case 'run': await this.run(); break;
                case 'reset': await this.reset(); break;
                case 'undo': await this.undo(); break;
                default: throw new TypeError(`Invalid action "${action}"`);
            }
        } catch (err) {
            console.log(err);
        } finally {
            this.db.quit();
        }
    }

    async prepareMigrations() {
        const migrations = await this.readMigrationsFromDB();
        const completed = migrations.map(row => row.title);

        this.readMigrationsFromDisk(completed);
    }

    readMigrationsFromDisk(completed) {
        fs.readdirSync(this.migrationsPath).forEach((file) => {
            this.migrations.push({
                ...require(this.migrationsPath + file),
                title: file,
                status: this.translateStatus(completed.includes(file)),
            });
        });
    }

    async readMigrationsFromDB() {
        return await this.db.getMigrations();
    }

    list() {
        console.log('');
        console.table(this.migrations.reduce((result, migration) => {
            result[migration.title] = { status: migration.status };
            return result;
        }, {}));
    }

    async run() {
        console.log('');
        const pendingMigrations = this.filterByStatus('down');

        if (pendingMigrations.length) {
            for (const migration of pendingMigrations) {
                const result = await this.processRun(migration);

                if (!result) break;
            }
        } else {
            console.log('Migrations done!');
        }

        return this.list();
    }

    async processRun(migration) {
        const result = await this.db.runMigration(async () => {
            await migration.up(this.db);
            await this.db.insertMigration(migration);
        });

        migration.status = this.translateStatus(result);

        console.info(`- Up "${migration.title}" ${this.translateResult(result)}`);

        return result;
    }

    async reset() {
        console.log('');
        const pendingMigrations = this.filterByStatus('up');

        if (pendingMigrations.length) {
            for (const migration of pendingMigrations) {
                await this.processUndo(migration);
            }
        } else {
            console.log('Migrations done!');
        }

        return this.list();
    }

    async processUndo(migration) {
        const result = await this.db.runMigration(async () => {
            await migration.down(this.db);
            await this.db.deleteMigration(migration);
        });

        migration.status = this.translateStatus(!result);

        console.info(`- Undo "${migration.title}" ${this.translateResult(result)}`);

        return result;
    }

    async undo() {
        console.log('');
        const lastMigration = this.filterByStatus('up').at(-1) || null;

        if (lastMigration) {
            await this.processUndo(lastMigration);
        } else {
            console.log('Migrations done!');
        }

        return this.list();
    }

    filterByStatus (status) {
        return this.migrations.filter(
            migration => migration.status === status
        );
    }

    translateStatus(status) {
        return status ? 'up' : 'down';
    }

    translateResult(result) {
        return result ? 'successfully' : 'failed';
    }
}

module.exports = Migrations;
