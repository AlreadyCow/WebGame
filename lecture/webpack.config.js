const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name : 'word-relay-setting',
    mode : 'development', // 실서비스 : production
    devtool : 'eval',
    resolve : {
        extensions : ['.js', '.jsx']
    },

    entry : {
        app : ['./client2', './client3', './client4', './client5', './client6', './client7', './client8'],
    }, // 입력
    module : {
        rules : [{
            test : /\.jsx?/,
            loader : 'babel-loader',
            options : {
                presets : [
                    ['@babel/preset-env', {
                        targets : {
                            browsers : ['> 1% in KR'], // browers list
                        },
                        debug : true,
                    }],
                    '@babel/preset-react',
                ],
                plugins : [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',
                ],
            },
        }],
    },
    plugins : [
        new RefreshWebpackPlugin()
    ],
    output : {
        path : path.join(__dirname, 'dist'),
        filename : 'app.js',
        publicPath : '/dist/',
    }, // 출력
    devServer : {
        devMiddleware : {publicPath : '/dist/'},
        static : {directory : path.resolve(__dirname)},
        hot : true,
        // historyApiFallback : {
        //     index : 'WordRelay.html',
        // },
    },
};