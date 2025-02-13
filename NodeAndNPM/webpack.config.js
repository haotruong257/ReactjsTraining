const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  const isDevelopment = Boolean(env.development); // Check if the environment is development
  return {
    mode: isDevelopment ? "development" : "production",
    entry: {
      app: path.resolve(__dirname, "src/index.js"),
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[contenthash].js",
      clean: true,
    },
    devtool: isDevelopment ? "source-map" : false,
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        title: "Webpack App",
      }),
    ],

    devServer: {
      static: {
        directory: "dist", // Đường dẫn tới thư mục chứa file html
      },
      port: 3000, // Cổng mà server sẽ lắng nghe
      open: true, // Mở trình duyệt khi chạy server
      hot: true, // Tự động load lại trình duyệt khi có sự thay đổi trong code

      // Chỉ định đường dẫn tới file html chứa các thẻ script
      // Nếu không chỉ định thì mặc định là index.html
      // Nhưng trong trường hợp này, file html nằm trong thư mục dist
      // nên cần chỉ định lại đường dẫn
      compress: true, // Nén file
      historyApiFallback: true, // Set true nếu bạn dùng cho các SPA và sử dụng HTML5 History API
    },
  };
};
