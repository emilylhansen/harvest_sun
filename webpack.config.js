module.exports = {
  entry: "./lib/harvest_sun.js",
  output: {
  	filename: "./lib/bundle.js"
  },
  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js"]
  }
};
