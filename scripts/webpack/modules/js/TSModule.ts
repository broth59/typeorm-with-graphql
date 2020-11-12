import path from 'path'
//config
import Module from '../Module'
import { ENVKEY } 		from '@config/env'
import { Container } 	from 'typescript-ioc'
import { Path } 		from '@config/paths'
import BABEL_CONFIG		from '@config/babel/babelrc' 

export default class TSModule implements Module {
    public test    = /\.(ts|tsx)$/
    public exclude = /node_modules/
    public loader  = 'awesome-typescript-loader'
    public options = {
        silent      	: false,
		configFileName  : path.join(Path.client, 'tsconfig.json'),
		useBabel    : true,
		babelCore   : '@babel/core',
		babelOptions: {
			babelrc: false,
			...BABEL_CONFIG
		}
	}
	
	constructor(
		config_file_name:string,
		require_tranplie?: boolean,
		should_be_silent?:boolean,
	){
		this.confirmShouldBeSilent(should_be_silent)
		this.confirmUseBabel(require_tranplie)
		this.setTSConfigFileName(config_file_name)
	}

	private confirmShouldBeSilent(should_be_silent:boolean|undefined){
		if(should_be_silent === null && should_be_silent === undefined){
			this.options.silent = Container.getValue(ENVKEY.CLIENT.WEBPACK.SHOULD_BE_VERBOS)
		}else{
			this.options.silent = should_be_silent!	
		}
	}

	private confirmUseBabel(require_tranplie:boolean|undefined){
		if(require_tranplie === null && require_tranplie === undefined){
			this.options.useBabel = true
		}else{
			this.options.useBabel = require_tranplie!	
		}
	}

	private setTSConfigFileName(config_file_name:string){
		this.options.configFileName = config_file_name
	}
    
}