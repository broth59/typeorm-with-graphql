import '@config/env'
import webpack from 'webpack';
import { Inject } from 'typescript-ioc';


export default class CssLoader implements webpack.RuleSetLoader{
    public loader  = 'css-loader'
    public options:webpack.RuleSetQuery

    constructor(options?:webpack.RuleSetQuery ){
        this.options = options || {}
    }
    
}