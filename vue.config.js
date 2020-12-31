

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
              private: true ,
              token : "0aefe57deb228ecf57734267680531e2cec665d4"
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