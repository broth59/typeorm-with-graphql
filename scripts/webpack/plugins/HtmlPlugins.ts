import { ENVKEY } from '@config/env'
import { Container, InjectValue } from 'typescript-ioc'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
//config
import { Path } from '@config/paths'
import Plugins from './Plugins'
import fs from 'fs'


export default class HtmlPlugins implements Plugins {
	
	@InjectValue(ENVKEY.CLIENT.WEBPACK.SHOULD_BE_VERBOS)
    private should_be_specific?: boolean

	@InjectValue(ENVKEY.SERVER.PUBLIC_PATH)
    private public_path?: string
	

    private resolveHtmlWebpackPlugin(){
		return new HtmlWebpackPlugin(
            Object.assign(
              {},
              {
                inject: true,
				//contents,
				publicPath 	   : this.public_path,
				template	   : Path.index_html,
				filename: 'index.html'
              },
              !this.should_be_specific
                ? {
                    minify: {
                      removeComments: true,
                      collapseWhitespace: true,
                      removeRedundantAttributes: true,
                      useShortDoctype: true,
                      removeEmptyAttributes: true,
                      removeStyleLinkTypeAttributes: true,
                      keepClosingSlash: true,
                      minifyJS: true,
                      minifyCSS: true,
                      minifyURLs: true,
                    },
                  }
                : undefined
            )
        )
    }

    resolvePlugins():Array<webpack.Plugin>{
        return [
            this.resolveHtmlWebpackPlugin()
        ]       
    }


}