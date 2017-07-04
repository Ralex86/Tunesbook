var path = require('path')


module.exports = {
    entry:['./app/app.jsx','whatwg-fetch'],
    output: {
        path: __dirname,
        filename: '../../var/www/html/bundle.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.css$/,
                loader: 'style-loader'
            }, 
            {
                test: /\.css$/,
                loader: 'css-loader',
                query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            }
        ]
    }
};
