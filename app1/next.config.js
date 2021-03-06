const {
    withModuleFederation,
    MergeRuntime
} = require("@module-federation/nextjs-mf")
const path = require("path")

module.exports = {
    webpack: (config, options) => {
        const {buildId, dev, isServer, defaultLoaders, webpack} = options
        const mfConf = {
            name: 'app1',
            library: {type: config.output.libraryTarget, name: 'app1'},
            filename: 'static/runtime/remoteEntry.js',
            remotes: {},
            exposes: { // This is the exposed component ('./page1') & its source file ('./components/page1').
                './page1': './components/page1',
                './add': './utils/add',
                './multiplyByTwo': './utils/multiplyByTwo',
                './search': './components/search',
            },
            shared: [],
        };

        withModuleFederation(config, options, mfConf);
        config.plugins.push(new MergeRuntime())
        if(!isServer) {
            config.output.publicPath = 'http://localhost:3000/_next/'
        }
        return config
    }
}