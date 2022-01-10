module.exports = {
    up: async (db) => {
        return await db.query(`
            CREATE TABLE IF NOT EXISTS people (
                id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                PRIMARY KEY(id),
                UNIQUE KEY unique_name (name)
            )
        `);
    },
    down: async (db) => {
        return await db.query(`
            DROP TABLE people
        `);
    },
};
