import 'reflect-metadata';
import { Container, ENVKEY, Profile } from '@config/env';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { createConnection, ConnectionOptions, EntityManager } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';

import Resolvers from '@server/graphql/resolver';
import Entities from '@interface/entity';
import * as Routes from '@server/router';

const DB_CONFIG = Container.getValue(ENVKEY.SERVER.DB_CONFIG);

/* DEVELOPMENT */
Container.environment(Profile.DEVELOPMENT);
Container.bindName(ENVKEY.SERVER.EXPRESS.APP).to(async () => {
    const app = express();
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());

    const db_connection = await createConnection({
        ...DB_CONFIG,
        entities: Entities,
    } as ConnectionOptions);

    const schema = await buildSchema({
        resolvers: Resolvers,
        nullableByDefault: true,
    } as any);

    const apollo_server = new ApolloServer({
        schema: schema,
        context: () => {
            return {
                db: db_connection.manager,
            };
        },
    });

    apollo_server.applyMiddleware({ app });

    connectRouter(app, db_connection.manager);

    return [app];
});

function connectRouter(app: Express, db_manager: EntityManager) {
    new Routes.UserRouter(app, db_manager);
}
