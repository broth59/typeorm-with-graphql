import { ENVKEY } from '@config/env'
import { Container, InjectValue } from 'typescript-ioc';
import Module from '../Module';


export default class FileModule implements Module {
    public exclude = /\.(js|mjs|jsx|ts|tsx|html|json)$/
    public loader  = 'file-loader'
    public options = {
        name: '[name].[hash:8].[ext]'
    }

    constructor(){
        
    }
    
}