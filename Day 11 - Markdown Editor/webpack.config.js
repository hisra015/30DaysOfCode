const path = require('path');

module.exports = {
  entry: './src/index.ts',  // Entry point for your TypeScript code
  module: {
    rules: [
      {
        test: /\.ts$/,  // Compile .ts files using ts-loader
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],  // Resolve TypeScript and JavaScript files
  },
  output: {
    filename: 'bundle.js',  // Output bundled JS file
    path: path.resolve(__dirname, 'dist'),  // Output path
  },
};
