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
      axes : [],
      max : 0.5,
      min : -0.5,
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
    },

    _publish_topic_cmd_vel : function(state, payload){

      if (state.ros.status){
        var cmdVelTopic = new ROSLIB.Topic({
          ros : state.ros.client, 
          name : payload.topic_name,  
          messageType : payload.topic_msg_type  
        });
  
        var cmdVelMsg = new ROSLIB.Message({
          linear : { x : -1 * state.gamepad.axes[3]  , y : 0, z : 0} ,
          angular : { x : 0, y : 0, z : state.gamepad.axes[2] } 
        })
  
        if (state.gamepad.buttons[4]){
          cmdVelTopic.publish(cmdVelMsg)
        }
      }

    }
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
    },

    publish_topic_cmd_vel : function(context, payload) {
      context.commit("_publish_topic_cmd_vel", payload)
    }

  },
  modules: {}
});
