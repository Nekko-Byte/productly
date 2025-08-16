const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

module.exports = (env, options) => {
  const isProduction = options.mode === "production";

  const config = {
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? false : "source-map",
    entry: ["./src/scripts/main.js", "./src/styles/main.scss"],
    output: {
      filename: "bundle.[hash].js",
      path: path.join(__dirname, "/dist"),
      clean: true,
      assetModuleFilename: "assets/[hash][ext]",
    },
    resolve: {
    alias: {
      '@fonts': path.join(__dirname, 'src/assets/fonts'),
      '@icons': path.join(__dirname, 'src/assets/icons'),
      '@images': path.join(__dirname, 'src/assets/images'),
    },
  },
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: "asset/resource",
          generator: {
            filename: "images/[name][ext]",
          },
        },
        {
          test: /\.svg$/i,
          type: "asset/resource",
          generator: {
            filename: "icons/[name][ext]"
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "fonts/[name][ext]",
          },
        },
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              targets: "defaults",
              presets: [["@babel/preset-env"]],
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: !isProduction,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify: isProduction
          ? {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
            }
          : false,
      }),
      new MiniCssExtractPlugin({
        filename: isProduction ? "styles.[contenthash].css" : "styles.css",
      }),
      new ESLintWebpackPlugin(),
    ],
  };

  if (!isProduction) {
    config.devServer = {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      compress: true,
      port: 4444,
      hot: true,
      open: true,
    };
  }

  return config;
};
