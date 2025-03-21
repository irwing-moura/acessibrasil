// const { merge } = require('webpack-merge');
// const common = require('./webpack.common.js');
// const TerserPlugin = require('terser-webpack-plugin');
// const path = require('path');
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//
// module.exports = merge(common, {
//     mode: 'production',
//     devtool: false, // Desativa source maps para produção
//     output: {
//         // filename: '[name].[contenthash].bundle.js', // Inclui o contenthash no nome dos arquivos  - FINAL PROD
//         filename: '[name].bundle.js', // Inclui o contenthash no nome dos arquivos
//         path: path.resolve(__dirname, 'dist'),
//         clean: true, // Limpa o diretório 'dist' antes de cada build
//     },
//     optimization: {
//         minimize: true, // Habilita a minificação
//         minimizer: [
//             new TerserPlugin({
//                 terserOptions: {
//                     compress: {
//                         drop_console: true, // Remove todos os console.logs
//                     },
//                     format: {
//                         comments: false, // Remove todos os comentários
//                     },
//                 },
//                 extractComments: false,
//             }),
//         ],
//         // splitChunks: {
//         //     chunks: 'all', // Faz code splitting automático para otimização
//         // },
//         //todo:: ESTA CAUSANDO PROBLEMA NO IMPORT, POIS ESTOU IMPORTANDO DIRETAMENTE SOMENTE O MAIN.BUNDLE.JS, E COMO ELE GERA 2, O CODIGO DA PROBLEMA POIS FICA INCOMPLETO
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.css$/,
//                 use: ['style-loader', 'css-loader'],
//             },
//         ]
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: './src/index.html', // Caminho do template HTML
//             filename: 'index.html', // Nome do arquivo HTML gerado
//         }),
//         new HtmlWebpackPlugin({
//             template: './src/widget.html', // Caminho do template HTML
//             filename: 'widget.html', // Nome do arquivo HTML gerado
//         }),
//         // ,
//         // new MiniCssExtractPlugin({
//         //     filename: 'main.css'
//         // }),
//     ],
// });



//TESTE EM HOMOLOGAÇÃO - CLIENT-INCLOOWE

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: 'none',
    devtool: 'source-map', // Ativa source maps para depuração
    devServer: {
        static: './src', // Configura o servidor local para servir a pasta 'dist'
        // hot: true,        // Hot Module Replacement (HMR) para recarregar módulos sem perder estado
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/widget.html', // Caminho do template HTML
            filename: 'widget.html', // Nome do arquivo HTML gerado
        }),

    ],
});
