const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      if (process.env.NODE_ENV === 'production') {
        webpackConfig.optimization.minimizer = [
          new TerserPlugin({
            terserOptions: {
              mangle: true,
              compress: {
                drop_console: true,
              },
            },
          }),
        ];
      }
      return webpackConfig;
    },
  },
};
