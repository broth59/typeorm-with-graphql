
import webpack from 'webpack'


export default interface Module {
        test?    : RegExp
        exclude?: RegExp
        use?     : Array<webpack.RuleSetUse>
} 