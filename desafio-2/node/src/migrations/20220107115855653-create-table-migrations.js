module.exports = {
    up: async (db) => {
        return await db.query(`
            CREATE TABLE IF NOT EXISTS migrations (
                id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                title VARCHAR(255) NOT NULL,
                PRIMARY KEY(id),
                UNIQUE KEY unique_title (title)
            )
        `);
    },
    down: async (db) => {
        return await db.query(`
            DROP TABLE migrations
        `);
    },
};
