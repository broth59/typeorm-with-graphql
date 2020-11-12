

module.exports = {
	plugins: [
		'react-hot-loader/babel',
		'babel-plugin-emotion',
	],
	/* chunk of plugins */
	presets     : [
		[ '@babel/preset-env' ],
		[ '@babel/preset-react' ],
		[ '@emotion/babel-preset-css-prop', {
       		autoLabel	: true,
       		labelFormat	: "[local]"
     	}],
	]
}