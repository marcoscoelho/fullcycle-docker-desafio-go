const Config =require('./config');
const DB =require('./db');
const Person =require('./entities/person');
const Server =require('./server');

const db = new DB(Config.get('mysql'));
const server = new Server(Config.get('server'));

!(async () => {
    const person = new Person({ name: 'Marcos Coelho' });
    await db.insertPerson(person.toJSON());

    server.registerRoutes((router) => {
        router.get('/', async (req, res) => {
            const people = await db.getPeople();
            res.render('index', { people });
        });

        router.get('/:name', async (req, res) => {
            await db.insertPerson(new Person(req.params))
            res.redirect('/');
        });
    });

    server.listen();
})();
