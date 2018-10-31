const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
	config = injectBabelPlugin(
		['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], // change importing css to less
		config,
	);
	// do stuff with the webpack config...
	config = rewireLess.withLoaderOptions({
	modifyVars: { "@primary-color": "#1DA57A" },
		javascriptEnabled: true,
	})(config, env);
	return config;
};
