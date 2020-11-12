import webpack from "webpack"
import { ENVKEY } from '@config/env'
import { Container } from './bootstrap'
import 'colors'
 
const compiler = webpack(Container.getValue(ENVKEY.SERVER.WEBPACK.COMPILER_CONFIG))
compiler.run((err, stats)=>{
	if(err){
		console.log(err.message)
	}
	console.log(err)
	const stats_info = stats.toJson() 
	if(stats.hasErrors()){ 
		console.log(stats_info.errors.join('\n').red)
	}
	if(stats.hasWarnings()){
		console.log(stats_info.warnings.join('\n').red)
	}
})
