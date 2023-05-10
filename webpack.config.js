const path = require("path");

module.exports = {
  entry: {
    app: ["./client/app.jsx"],
    login: ["./client/login.jsx"],
  },
  output: {
    path: path.join(__dirname, "/public/js"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [],
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
