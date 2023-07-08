const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
    console.log("env -> ", env)

    return {
        entry: './index.js',
        output: {
            filename: '[name].bundle.js',  //[name] will get the value from file map's key in the "entry" map
            path: path.resolve(__dirname, "dist"),
            publicPath: '/'
        },
        mode: "development",
        devtool: "eval-source-map",
        devServer: {
            port: 4000,
            static: {
                directory: path.resolve(__dirname, 'dist')
            },
            devMiddleware: {
                index: 'index.html',
                writeToDisk: true
            }
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                ['@babel/preset-react', { runtime: 'automatic' }],
                            ],
                        }
                    }
                },
                {
                    test: /\.(s?css)$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader']
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),     //cleans up all files inside output path by default
            new HtmlWebpackPlugin({
                title: "Mind Flip",
                filename: 'index.html',
                template: 'public/template.html',
                description: "Meeting of the minds"
            }),
            new CopyPlugin({
                patterns: [
                  { from: path.resolve(__dirname, "public", "favicon.ico"), to: path.resolve(__dirname, "dist") },
                  { from: path.resolve(__dirname, "public", "manifest.json"), to: path.resolve(__dirname, "dist") },
                ]
            }),
            new Dotenv({
                path: path.resolve(process.cwd(), ".env")
            }),
        ]
    }
}