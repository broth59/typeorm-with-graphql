import mysql from 'mysql';
import 'babel-polyfill';

it('create connection', async (done) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'mysql_user',
        password: 'mysql_password',
        database: 'visitlog',
        port: 3306,
    });

    connection.connect((error, db) => {
        expect(error).toBeFalsy();
        done();
    });
});
