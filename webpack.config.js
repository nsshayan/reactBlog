config = {
    entry: './src/main/webapp/main.js',
    output: {
        path: __dirname,
        filename: './src/main/webapp/index.js'
    },
    devServer: {
        inline: true,
        port: 9090
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
}
module.exports = config;