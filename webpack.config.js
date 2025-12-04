module.exports = (env, argv) => {
    const path = require("path");
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    const isDev = argv.mode === "development";
    const isProd = !isDev;

    return {
        entry: "./src/index.js",
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "dist"),
            clean: true,
        },
        mode: isDev ? "development" : "production",
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.(png|jpg|jpeg|svg|gif|woff|woff2|ttf|eot)$/i,
                    type: "asset/resource",
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "styles.css",
            }),
            new HtmlWebpackPlugin({
                template: "./index.html",
            }),
        ],
        devServer: {
            static: {
                directory: path.join(__dirname),
            },
            open: true,
            hot: true,
        },
    };
};