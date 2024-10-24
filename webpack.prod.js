const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: 'production',
    devtool: false, // Desativa source maps para produção
    output: {
        filename: '[name].[contenthash].bundle.js', // Inclui o contenthash no nome dos arquivos
        path: path.resolve(__dirname, 'dist'),
        clean: true, // Limpa o diretório 'dist' antes de cada build
    },
    optimization: {
        minimize: true, // Habilita a minificação
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true, // Remove console.logs em produção
                    },
                },
            }),
            new CssMinimizerPlugin(), // Minifica CSS se necessário
        ],
        splitChunks: {
            chunks: 'all', // Faz code splitting automático para otimização
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Caminho do template HTML
            filename: 'index.html', // Nome do arquivo HTML gerado
        }),
    ],
});
