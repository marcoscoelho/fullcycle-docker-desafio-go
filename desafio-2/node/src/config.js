const Config = {
    mysql: {
        host: process.env.MYSQL_HOST || 'db',
        database: process.env.MYSQL_DATABASE || 'nodedb',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'password',
    },
    server: {
        host: process.env.SERVER_HOST || 'localhost',
        port: process.env.SERVER_PORT || '3000',
    },
};


module.exports = {
    get: (key) => (Config[key] || null),
};
