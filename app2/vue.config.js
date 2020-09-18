//vue配置文件
const path = require('path')

const STARTWAY = process.env.VUE_APP2_STARTWAY;
if(STARTWAY==='micro') {
    module.exports = {
        publicPath: '//localhost:8003/',
        productionSourceMap: false,
        outputDir: path.resolve(__dirname, 'buildApp2/'),
        chainWebpack: config => {
            config.devtool('source-map')
            config.entryPoints.clear()
            config.entry('singleSpaEntry').add('./src/main.js')
            config.entry('store').add('./src/store/index.js')           
            config.output.filename('[name].js').library('app2').libraryTarget('amd')
            config.devServer.port(8003).headers({
                "Access-Control-Allow-Origin": "*"
            })
        }
    }
}else {
    module.exports = {
        productionSourceMap: false,
        chainWebpack: config => {
            config.devtool('source-map')
            config.devServer.port(8013).headers({
                "Access-Control-Allow-Origin": "*"
            })
        }
    }
}
