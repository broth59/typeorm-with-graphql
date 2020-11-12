import { ENVKEY } from '@config/env'
import { Inject, InjectValue, Container } from 'typescript-ioc';
import webpack from 'webpack';
import Module from '../Module';

export default class CssModule implements Module {
    public test    = /\.css$/
    public exclude = /\.module\.css$/ 
	public use?: Array<webpack.RuleSetUse>

    constructor(){

	}
    
}