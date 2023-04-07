const { useBabelRc, override } = require('customize-cra')
const path = require('path')

module.exports = override(useBabelRc())

module.exports = function override(_config) {
	// Extend babel-rc config first
	const config = useBabelRc()(_config)

	// Custom config mods, remember to spread previous config!
	config.resolve = {
		...config.resolve,
		alias: {
			...config.resolve.alias,
			//
			// NOTE: add alias here that's added to tsconfig.path.json!
			//
			'@': path.resolve(__dirname, 'src/'),
			// '@types': path.resolve(__dirname, 'src/types'),
		},

		// for node.js native modules not natively supported in React
		fallback: {
			...config.resolve.fallback,
			assert: require.resolve('assert'),
		}
	}

	return config
}
