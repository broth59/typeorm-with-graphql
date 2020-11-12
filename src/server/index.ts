import { ENVKEY } from '@config/env';
import { Container } from '@server/bootstrap';
import { Express } from 'express';
import 'colors';
//error
import ErrorHandlers from './error/handler';
import ERROR from './error/type';

const PORT = Container.getValue(ENVKEY.SERVER.PORT);
const HOST = Container.getValue(ENVKEY.SERVER.HOST);

(async () => {
    const [app]: [Express] = await Container.getValue(
        ENVKEY.SERVER.EXPRESS.APP
    )();

    app.listen(PORT, HOST, () => {
        console.log(`listening on ${PORT}`);
    });

    app.get('/', (req, res) => {
        res.send('welcome to rootasdas');
    });

    app.use('*', function () {
        throw Error(ERROR.HTTP.HTTP_404);
    });

    app.use(ErrorHandlers);
})().catch((e) => console.log(e.message['red']));
