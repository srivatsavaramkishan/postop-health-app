// config-overrides.js

module.exports = function override(config, env) {
    // Exclude source-map-loader for react-datepicker
    config.module.rules.push({
      test: /\.js$/,
      enforce: 'pre',
      use: ['source-map-loader'],
      exclude: [
        /node_modules\/react-datepicker/,  // Exclude react-datepicker source maps
      ],
    });
  
    return config;
  };
  