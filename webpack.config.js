const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: "./app/assets/js/main.js",
    cookieBanner: "./app/assets/js/cookieBanner.js",
    css: "./app/assets/styles/main.sass",
  },
  output: {
    path: __dirname + "/app/assets/dist",
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: ["./node_modules/normalize-scss/sass"],
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf)$/,
        type: "asset/resource",
        generator: {
          filename: "[name][ext]",
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          type: "css/mini-extract",
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.css",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "app"),
    },
    open: true,
    port: 3000,
    devMiddleware: {
      writeToDisk: true,
    },
  },
};
