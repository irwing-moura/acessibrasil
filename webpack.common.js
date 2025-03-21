const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // Limpa o diretório 'dist' antes de cada build
    },
    module: {
        rules: [
            {
                test: /\.html$/, // Padrão para identificar arquivos HTML
                use: [
                    {
                        loader: 'html-loader', // Usa o html-loader para processar HTML
                        options: {
                            minimize: true, // Minimiza o HTML, removendo espaços e comentários
                        },
                    },
                ],
            },
            // Regra para JavaScript e JSX
            {
                test: /\.js$/, // Aceita arquivos .js
                exclude: /node_modules/, // Exclui a pasta node_modules
                use: {
                    loader: 'babel-loader', // Usa Babel para transpilar JavaScript moderno
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },

            // Regra para arquivos CSS
            // {
            //     test: /\.css$/, // Aceita arquivos .css
            //     use: ['style-loader', 'css-loader'], // Aplica CSS no DOM e resolve @imports
            // },

            // Regra para imagens (PNG, JPG, GIF, SVG)
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: 'asset/resource', // Trate imagens como recursos
                generator: {
                    filename: 'images/[name][ext]', // Coloca as imagens na pasta "images"
                },
            },

            // Regra para fontes
            {
                test: /\.(woff(2)?|ttf|eot|svg|otf)$/i,
                type: 'asset/resource', // Trate as fontes como recursos
                generator: {
                    filename: 'fonts/[name][ext]', // Coloca as fontes na pasta "fonts"
                },
            },

            // Regra para JSONs dos SVGS
            {
                test: /\.json$/,
                type: 'asset/resource',
                generator: {
                    filename: 'svg/[name][ext]', // Ou 'svg/[name][ext]' se quiser na pasta "svg"
                },
            },
        ],
    }
};
