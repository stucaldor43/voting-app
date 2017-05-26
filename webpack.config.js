const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: ["whatwg-fetch", "./index.js"],
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js"
    },
    module: {
      rules: [
        {
            test: /\.js$/,
            exclude: path.resolve(__dirname, "node_modules"),
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["es2015"]
                }
            }
        }    
      ]  
    },
    devtool: "source-map",
    plugins: [
        new BrowserSyncPlugin({
            host: "localhost",
            port: 8080,
            proxy: "localhost:8081"
        })
    ]
};