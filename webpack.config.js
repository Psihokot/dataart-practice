var webpack = require("webpack"),
    path = require('path');

module.exports = {
    context: path.join(__dirname, "assets", "js"),
    entry: {
        home: "./main"
    },
    
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "index.js"
    },

    watch: true,

    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },

    resolve: {
        root: path.resolve(__dirname, "vendor"),
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

// module.exports.plugins.push(
//     new webpack.optimize.UglifyJsPlugin({
//         compress: {
//             warnings: false,
//             drop_console: true,
//             unsafe: true
//         }
//     })
// );