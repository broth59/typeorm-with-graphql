import { ENVKEY } from '@config/env';
import { Container } from 'typescript-ioc';
import webpack from 'webpack';
import webpackNode from 'webpack-node-externals';
import path from 'path';
//domains
import JsModule from '../webpack/modules/js';
//config
import { Path } from '@config/paths';

Container.bindName(ENVKEY.CLIENT.WEBPACK.PATH_ALIAS).to(
    (() => {
        return {
            '@config': Path.config,
            '@server': Path.server,
            '@interface': Path.interface,
            '@domain': Path.domain,
            '@client': Path.client,
            '@component': Path.component,
            '@page': path.join(Path.component, 'page'),
            '@store': path.join(Path.client, 'store'),
            '@hooks': path.join(Path.client, 'hooks'),
            '@decorators': path.join(Path.client, 'decorators'),
        };
    })()
);

Container.bindName(ENVKEY.SERVER.WEBPACK.COMPILER_CONFIG).to(
    (() => {
        //mode
        const should_be_specifict = Container.getValue(
            ENVKEY.CLIENT.WEBPACK.SHOULD_BE_VERBOS
        );
        const mode = should_be_specifict ? 'development' : 'production';
        const devtool = should_be_specifict ? '#@inline-source-map' : '';
        //resource
        const public_path = Container.getValue(ENVKEY.SERVER.PUBLIC_PATH);
        const alias_path = Container.getValue(ENVKEY.CLIENT.WEBPACK.PATH_ALIAS);

        return {
            /* Define entries */
            context: Path.server,
            target: 'node',
            node: {
                __dirname: false,
            },
            entry: ['./index'],
            resolve: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                alias: alias_path,
            },

            /* Define loaders */
            module: {
                rules: [
                    {
                        oneOf: [
                            new JsModule.TSModule(
                                path.join(Path.server, 'tsconfig.json'),
                                false
                            ),
                        ],
                    },
                ],
            },

            /* Define output */
            output: {
                publicPath: public_path,
                path: path.join(Path.dist, 'server'),
                filename: 'index.js',
            },

            /*  */
            optimization: {
                minimize: !should_be_specifict,
                splitChunks: {
                    chunks: 'all',
                    name: false,
                },
            },
            devtool: devtool,
            mode: mode,

            externals: [webpackNode()],
        } as webpack.Configuration;
    })()
);
