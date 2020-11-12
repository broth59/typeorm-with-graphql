import { ENVKEY } from '@config/env'
import { Container, InjectValue } from 'typescript-ioc';
import Module from '../Module';

export default class UrlModule implements Module {
    public test    = /\.(png|gif|jpe?g|png)$/
	public exclude = /node_module/
	public loader  = 'url-loader'
    public options = {
        limit   : 10000,
        name    : '[name].[hash:8].[ext]'
    }

    constructor(){
        
    }
    
}