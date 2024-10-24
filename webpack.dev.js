const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map', // Ativa source maps para depuração
    devServer: {
        static: './src', // Configura o servidor local para servir a pasta 'dist'
        hot: true,        // Hot Module Replacement (HMR) para recarregar módulos sem perder estado
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Caminho do template HTML
            filename: 'index.html', // Nome do arquivo HTML gerado
            inject: false,
        }),
    ],
});