const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  devtool: "inline-source-map",
  entry: ["./src/index.js"],
  mode: "development",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
  },
  devServer: {
    host: "0.0.0.0",
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin(),
    // {template: "./src/index.html",}
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.3mf$/,
        use: ["file-loader"],
      },
    ],
  },
};
