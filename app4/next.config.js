const {
    withModuleFederation,
    MergeRuntime
} = require("@module-federation/nextjs-mf")
const path = require("path")

module.exports = {
    webpack: (config, options) => {
        const {buildId, dev, isServer, defaultLoaders, webpack} = options
        const mfConf = {
            name: 'app4',
            library: {type: config.output.libraryTarget, name: 'app4'},
            filename: 'static/runtime/remoteEntry.js',
            remotes: {},
            exposes: {
                './page1': './components/page1',
                './billing': './components/billing',
            },
            shared: [],
        };

        withModuleFederation(config, options, mfConf);
        config.plugins.push(new MergeRuntime())
        if(!isServer) {
            config.output.publicPath = 'http://localhost:3003/_next/'
        }
        return config
    }
}