

module.exports = {
    publicPath : './',  
    pluginOptions: {
      electronBuilder: {
        nodeIntegration : true, 
        __dirname : true,
        builderOptions: {
          appId : "com.muhammadarshad.servicerobot",
          win: {
            icon: './src/assets/logo.png'
          },
          extraResources : [
            "node_modules",
          ],
          productName: "Service Robot",
          extraFiles: [], 
          files: []
        },
        externals: [],
        nodeModulesPath: ['./node_modules']
      }
    }
  }