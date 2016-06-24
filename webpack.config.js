var webpack = require("webpack");

module.exports = {
    context: __dirname + '/assets/js',
    entry: {
        home: "./home"
    },
    
    output: {
        path: __dirname + "/public",
        filename: "index.js"
    },

    resolve: {
        root: __dirname + '/vendor',
        moduleDirectories: ['node_modules'],
        extensions: ['', '.js']
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Mustache: "mustache"
        })
    ]
};

module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: true,
            unsafe: true
        }
    })
);