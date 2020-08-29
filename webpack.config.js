const path = require('path');
const dotenv = require('dotenv-webpack');

module.exports = env => {
  // Use env.<YOUR VARIABLE> here:


  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    node: {
      fs: "empty",
    },
    plugins : [
      new dotenv(),
    ],
  };
};