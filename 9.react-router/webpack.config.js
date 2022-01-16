const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name : 'react-router-setting',
    mode : 'development', // 실서비스 : production
    devtool : 'eval',
    resolve : {
        extensions : ['.js', '.jsx']
    },

    entry : {
        app : ['./client'],
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
                    'react-refresh/babel',
                    '@babel/plugin-proposal-class-properties',
                ],
            },
            exclude: path.join(__dirname, 'node_modules'),
        }],
    },
    plugins : [
        new ReactRefreshWebpackPlugin()
    ],
    output : {
        path : path.join(__dirname, 'dist'),
        filename : 'app.js',
        publicPath : '/dist/',
    }, // 출력
    devServer : {
        historyApiFallback:true,
        devMiddleware : {publicPath : '/dist/'},
        static : {directory : path.resolve(__dirname)},
        hot : true,
    },
};