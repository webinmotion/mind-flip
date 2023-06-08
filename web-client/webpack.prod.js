const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
    console.log("env -> ", env)

    return {
        entry: './index.js',
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, "dist"),
            // publicPath: 'http://localhost:4000/'
        },
        mode: "production",
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
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
                                '@babel/preset-react',
                            ],
                        }
                    }
                },
                {
                    test: /\.(s?css)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader']
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css'
            }),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: "Minute Man",
                filename: 'index.html',
                template: 'public/template.html',
                chunks: ['index'],
                description: "Meeting minutes manager"
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