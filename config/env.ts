import { Container } from 'typescript-ioc';
import { NamespaceConfiguration } from 'typescript-ioc/dist/model';
import { ConnectionOptions } from 'typeorm';
import path from 'path';
import 'colors';

import { Path } from '@config/paths';

/* Define enviroment Profiles */
export enum Profile {
    DEVELOPMENT = 'PROFILE.DEVELOPMENT',
    TEST = 'PROFILE.TEST',
    PRODUCTION = 'PROFILE.PRODUNCTION',
}

/* Define environment keys */
export namespace ENVKEY {
    export namespace CLIENT {
        export enum WEBPACK {
            //Environment
            SHOULD_BE_VERBOS = '@env/client/webpack/shoud_be_specific',
            //Build
            PATH_ALIAS = '@env/client/webpack/path_alias',
            COMPILER_CONFIG = '@env/client/webpack/compiler_config',
            CSS_PROCESSORS = '@env/client/webpack/css_processors',
            HTML_PLUGINS = '@env/client/webpack/html_plugins',
            //Watch
            SERVER_CONFIG = '@env/client/webpack/server_config',
            PORT = '@env/client/webpack/port',
            HOST = '@env/client/webpack/host',
        }

        export namespace STORE {
            export const ROOT = '@env/client/store/root';
            export const CLIENT = '@env/client/store/client';
        }
    }

    export namespace SERVER {
        export const PORT = '@env/server/port';
        export const HOST = '@env/server/host';
        export const DOMAIN = '@env/server/domain';
        export const PUBLIC_PATH = '@env/server/public_path';
        export const DB_CONFIG = '@env/server/db_config';

        export namespace EXPRESS {
            export const APP = '@env/server/express/app';
            export const ROUTER = '@env/server/express/router';
            export const DB_CONNECTION = '@env/server/express/db_connection';
        }

        export namespace WEBPACK {
            export const COMPILER_CONFIG =
                '@env/server/webpack/compiler_config';
        }
    }
}

const environment = {
    namespace: {
        [Profile.DEVELOPMENT]: [
            { bindName: ENVKEY.CLIENT.WEBPACK.SHOULD_BE_VERBOS, to: true },
            { bindName: ENVKEY.CLIENT.WEBPACK.HOST, to: 'localhost' },
            { bindName: ENVKEY.CLIENT.WEBPACK.PORT, to: 3010 },

            { bindName: ENVKEY.SERVER.HOST, to: 'localhost' },
            { bindName: ENVKEY.SERVER.DOMAIN, to: 'http://localhost' },
            { bindName: ENVKEY.SERVER.PORT, to: 3020 },
            { bindName: ENVKEY.SERVER.PUBLIC_PATH, to: '/' },
            {
                bindName: ENVKEY.SERVER.DB_CONFIG,
                to: {
                    type: 'mysql',
                    host: 'localhost',
                    port: 3306,
                    username: 'mysql_user',
                    password: 'mysql_password',
                    database: 'visitlog',
                    // connectString:
                    //     '(DESCRIPTION =(ADDRESS_LIST =(ADDRESS = (PROTOCOL = TCP)(Host = localhost)(Port = 3306)))(CONNECT_DATA =(sid = test)(SERVER=dedicated)))',
                    synchronize: true,
                    logging: true,
                    entities: [
                        `${path.join(Path.interface, 'entity')}/**/*.ts`,
                    ],
                } as ConnectionOptions,
            },
        ],
        [Profile.TEST]: [
            { bindName: ENVKEY.CLIENT.WEBPACK.SHOULD_BE_VERBOS, to: false },
            { bindName: ENVKEY.CLIENT.WEBPACK.HOST, to: 'localhost' },
            { bindName: ENVKEY.CLIENT.WEBPACK.PORT, to: 3010 },

            { bindName: ENVKEY.SERVER.HOST, to: 'localhost' },
            { bindName: ENVKEY.SERVER.DOMAIN, to: 'http://localhost' },
            { bindName: ENVKEY.SERVER.PORT, to: 3020 },
            { bindName: ENVKEY.SERVER.PUBLIC_PATH, to: '/' },
            {
                bindName: ENVKEY.SERVER.DB_CONFIG,
                to: {
                    type: 'oracle',
                    host: 'localhost',
                    port: 3030,
                    username: 'TESTER',
                    password: '',
                    database: 'arena',
                    synchronize: true,
                    logging: true,
                } as ConnectionOptions,
            },
        ],
        [Profile.PRODUCTION]: [
            { bindName: ENVKEY.CLIENT.WEBPACK.SHOULD_BE_VERBOS, to: false },
            { bindName: ENVKEY.CLIENT.WEBPACK.HOST, to: 'localhost' },
            { bindName: ENVKEY.CLIENT.WEBPACK.PORT, to: 3010 },

            { bindName: ENVKEY.SERVER.HOST, to: '127.0.0.0' },
            { bindName: ENVKEY.SERVER.DOMAIN, to: 'http://localhost' },
            { bindName: ENVKEY.SERVER.PORT, to: 3020 },
            { bindName: ENVKEY.SERVER.PUBLIC_PATH, to: '/static/' },
            {
                bindName: ENVKEY.SERVER.DB_CONFIG,
                to: {
                    type: 'oracle',
                    host: 'localhost',
                    port: 3030,
                    username: 'TESTER',
                    password: 'PASSWORD',
                    database: 'xe',
                    synchronize: true,
                    logging: true,
                    entities: [
                        `${path.join(Path.interface, 'entity')}/**/*.ts`,
                    ],
                } as ConnectionOptions,
            },
        ],
    },
} as NamespaceConfiguration;

Container.configure(environment);

const [profile, color] = resolveRunTimeEnvironment();
Container.environment(profile);
console.log(`${`Node Environment is now`.cyan} ${profile[color]}`);

export { Container, restoreToRuntimeEnvironment };

function resolveRunTimeEnvironment() {
    const node_environment = process.env.NODE_ENV;
    let profile: Profile;
    let color: any;
    switch (node_environment) {
        case 'DEVELOPMENT':
            profile = Profile.DEVELOPMENT;
            color = 'green';
            break;
        case 'TEST':
            profile = Profile.TEST;
            color = 'cyan';
            break;
        case 'PRODUCTION':
            profile = Profile.PRODUCTION;
            color = 'red';
            break;
        default:
            profile = Profile.DEVELOPMENT;
            color = 'green';
    }
    return [profile, color];
}

function restoreToRuntimeEnvironment() {
    Container.environment(profile);
}
