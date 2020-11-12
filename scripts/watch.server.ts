import webpack from 'webpack';
import { exec } from 'child_process';
import 'colors';
import { ENVKEY } from '@config/env';
import { Container } from './bootstrap';
import { Path } from '@config/paths';

const compiler = webpack(
    Container.getValue(ENVKEY.SERVER.WEBPACK.COMPILER_CONFIG)
);
compiler.watch({ poll: 500 }, (err, stats) => {
    if (err) {
        console.log(err.message);
    }

    startServer();

    const stats_info = stats.toJson();
    if (stats.hasErrors()) {
        console.log(stats_info.errors.join('\n').red);
    }
    if (stats.hasWarnings()) {
        console.log(stats_info.warnings.join('\n').red);
    }
});

let pid: number;
function startServer() {
    if (!pid) {
        const server_process = exec(
            'nodemon server/index.js ',
            {
                cwd: Path.dist,
                maxBuffer: 1024 * 500,
            },
            (error, stdout, stderr) => {
                console.log(error, stdout, stderr);
                if (error) {
                    console.error(`An error occurred: `, error);
                } else {
                    console.log(`stdout:`, stdout);
                    console.log(`stderr:`, stderr);
                }
            }
        );
        pid = server_process.pid;
        server_process.unref();
        server_process.stdout!.on('data', function (data) {
            console.log(data.toString());
        });
        server_process.stdout!.on('error', function (data) {
            console.log(data.toString());
        });
    }
}
