import { Request, Response } from 'express' 
import { ERROR } from './type'
import { Path } from '@config/paths'
import path from 'path'

const HTTP_404_HANDLER = function (err:Error, req:Request, res:Response, next:AnyFunction) {
	console.log(err)
	if(err.message == ERROR.HTTP.HTTP_404){
		const index_html_path = path.join(Path.root, 'client', 'index.html') 
		res.sendFile(index_html_path)
	}else{
		next()
	}
}

const UNCAUGHT_ERROR_HANDLER = function (err:Error, req:Request, res:Response, next:AnyFunction) {
	console.log(err)
	res.send('uncaught')
}

export default [  
	HTTP_404_HANDLER,  
	UNCAUGHT_ERROR_HANDLER
]