import webpack from 'webpack'


export default interface Plugins {
    resolvePlugins(): Array<webpack.Plugin>
} 