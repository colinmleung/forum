var pg = require('pg');
var connectionString = process.env.DATABASE_URL;

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE accounts(id serial NOT NULL, username character varying(80) NOT NULL, password character(40) NOT NULL, '
                            + 'email character varying(100) NOT NULL)');
query.on('end', function() { cliend.end(); });