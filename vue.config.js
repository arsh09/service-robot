

module.exports = {
    publicPath : './',  
    pluginOptions: {
      electronBuilder: {
        nodeIntegration : true, 
        __dirname : true,
        builderOptions: {
          publish : [ 
            {
              provider: "github",
              repo : "service-robot",
              protocol : 'https',
              owner: "arsh09", 
              private: false ,
              token : "3d665476ac3a730c41d6027bf39cf704f927e7c1"
            } 
          ],
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