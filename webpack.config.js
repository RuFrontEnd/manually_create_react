// yarn add webpack
// webpack 運作的方式是透過指定一個單一檔案作為你的進入點。 這個檔案會是依賴圖(dependency graph)的 root。然後你每次 require 一個檔案從其他檔案並把它加入到 tree。當你執行 webpack，所有的檔案和 module 都會被 bundle 成一個檔案。
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // yarn add html-webpack-plugin

module.exports = {
  entry: "./src/index.js", // 從哪個檔案開始打包 p.s.也可以是陣列, webpack會根據陣列的 length 產生多個 bundle 檔
  output: {
    path: path.resolve(__dirname, "dist/"), // 要放的路徑, 預設為 ./dist/main.js
    publicPath: "/dist/",
    filename: "myBundle.js", // bundle 出來的檔名
  }, // 定義輸出 bundle 的相關資訊
  mode: "development", // 預設 bundle 的方式
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // 識別哪些檔案應該被 loader 轉換
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.css$/, // 判斷副檔名為 .css 者要被 loader 轉換
        use: ["style-loader", "css-loader"], // 轉換的 loader
      },
    ],
  }, // loaders => webpack 只可識別 js 或 json, 利用 loader 可以 bundle 不同的檔案類型(如 .css 檔)並可以在 .js 檔內 import 非 .js 的檔案
  resolve: { extensions: ["*", ".js", ".jsx"] },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 熱更新
    new HtmlWebpackPlugin({ template: "./dist/index.html" }), // html-webpack-plugin 將生成一個 html 檔並將生成的 bundle.js 檔引入
  ],
};
