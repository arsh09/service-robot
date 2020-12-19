import Vue from "vue";
import Vuex from "vuex";
import ROSLIB from "roslib"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

    gamepad: {
      name : "gamepad",
      isConnect : false, 
      gamepad : {},
      buttons : [],
      axes : []
    },

    ros : {
      name : "ros",
      client : null,
      ip : null,
      port : 9090,
      status : null,
      error : null,
    }

  },

  mutations: {

    _update_variable : function(state, payload) {
      state[payload._name] = payload
    },

    _connect_to_ros : function(state){
      state.ros.client = new ROSLIB.Ros({
      url : 'ws://' + state.ros.ip + ':' + state.ros.port.toString()
      });

      state.ros.client.on("connection", ()=>{
          state.ros.status  = state.ros.client.isConnected;
      });
      
      state.ros.client.on('error', (error) => {
          console.log('Error connecting to websocket server: ', error)
          state.ros.error = error
      });

      state.ros.client.on('close', () => {   
          state.ros.client = null
          state.ros.status = null
      });
      
      console.log(state.ros)
    },

    _disconnect_to_ros : function (state){
      if (! state.ros.client != null) {
        state.ros.client.close() 
        state.ros.status = false
      } else{
        state.ros.client = null
        state.ros.status = null
      }

      console.log(state.ros)
    },

  },

  actions: {
    update_variable : function(context, payload) {
      context.commit("_update_variable", payload)
    },

    connect_to_ros : function(context, payload) {
      context.commit("_connect_to_ros", payload)
    },

    disconnect_to_ros : function(context, payload) {
      context.commit("_disconnect_to_ros", payload)
    }
  },
  modules: {}
});
