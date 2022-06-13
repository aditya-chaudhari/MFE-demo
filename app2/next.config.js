const {
    withModuleFederation,
    MergeRuntime,
} = require('@module-federation/nextjs-mf')
const path = require('path')

module.exports = {
    webpack: (config, options) => {
        const {buildId, dev, isServer, defaultLoaders, webpack} = options;
        const mfConf = {
            name: 'app2', // This is the Name of the MFE.
            library: {type: config.output.libraryTarget, name: 'app2'}, // Library options help determine how the exposed code will be stored and retrieved.
            filename: 'static/runtime/remoteEntry.js', // This is the Name of the remote file.
            remotes: { // this defines our remote app name space, so we will be able to import from modules
                app1: isServer
                ? path.resolve(
                    __dirname,
                    '../app1/.next/server/static/runtime/remoteEntry.js'
                ): 'app1',
                app3: isServer
                ? path.resolve(
                    __dirname,
                    '../app3/.next/server/static/runtime/remoteEntry.js'
                ): 'app3',
                app4: isServer
                ? path.resolve(
                    __dirname,
                    '../app4/.next/server/static/runtime/remoteEntry.js'
                ): 'app4'
            },
            exposes: {}, // This is the exposed component
            shared: [], // The shared option allows you to share your node libraries for which the exposed module depends on to run. ["react", "react-dom","react-router-dom"]
        }

        // Configures ModuleFederation and other Webpack properties
        withModuleFederation(config, options, mfConf)

        config.plugins.push(new MergeRuntime())

        if(!isServer) {
            config.output.publicPath = 'http://localhost:3001/_next/'
        }

        return config;
    }
}