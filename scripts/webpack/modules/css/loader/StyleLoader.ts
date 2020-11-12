import '@config/env'
import webpack from 'webpack';


export default class StyleLoader implements webpack.RuleSetLoader {
    public loader  = 'style-loader'

    constructor(
        public options?: webpack.RuleSetQuery
    ){
        this.options = options || {}
    }
    
}