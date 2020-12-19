"use strict";

import { app, protocol, BrowserWindow } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}


// After initial build process
// const {hookupJoyStick} = require('@/common/joystick.js')

var controller_config = {
  "vendorID": 1133,
  "productID": 49695,
  "joysticks": [
      {
          "name": "left",
          "x": {
              "pin": 0
          },
          "y": {
              "pin": 2
          }
      },
      {
          "name": "right",
          "x": {
              "pin": 4
          },
          "y": {
              "pin": 6
          }
      }
  ],
  "buttons": [
      {
          "value": 64,
          "pin": 10,
          "name": "back"
      },
      {
          "value": 128,
          "pin": 10,
          "name": "start"
      },
      {
          "value": 28,
          "pin": 11,
          "name": "leftLeft"
      },
      {
          "value": 4,
          "pin": 11,
          "name": "leftUp"
      },
      {
          "value": 12,
          "pin": 11,
          "name": "leftRight"
      },
      {
          "value": 20,
          "pin": 11,
          "name": "leftDown"
      },
      {
          "value": 4,
          "pin": 10,
          "name": "X"
      },
      {
          "value": 8,
          "pin": 10,
          "name": "Y"
      },
      {
          "value": 1,
          "pin": 10,
          "name": "A"
      },
      {
          "value": 2,
          "pin": 10,
          "name": "B"
      },
      {
          "value": 16,
          "pin": 10,
          "name": "LB"
      },
      {
          "value": 32,
          "pin": 10,
          "name": "RB"
      },
      {
          "value": 255,
          "pin": 9,
          "name": "LT"
      },
      {
          "value": 0,
          "pin": 9,
          "name": "RT"
      }
  ]
}


// function hookupJoyStick(){
//   var GamePad = require( 'node-gamepad' );
//   var controller = new GamePad(controller_config);
//   controller.connect();
  
//   // controller.on( 'up:press', function() {
//   //     console.log( 'up' );
//   // } );
//   // controller.on( 'down:press', function() {
//   //     console.log( 'down' );
//   // } );
// }

// hookupJoyStick()