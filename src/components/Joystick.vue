

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },

  data(){
    return {
       gamepadIsConnected: false,
       gamepadIntervalId : -1,
    }
  },

  computed : {
    updateGamepad : {
        get(){
            return this.$store.state.gamepad
        },
        set(value){
            this.$store.dispatch("handle_variable", value);
        }
    } ,
  },

  mounted() {
    this.handle_add_event_listener();
    this.gamepadIntervalId = setInterval( this.handle_gamepad_polling, 100)  
  },

  beforeDestroy() {
    clearInterval( this.gamepadIntervalId)
  },

  methods: {

    handle_gamepad_polling : function() {
      if (this.gamepadIsConnected) {
       var gamepads = navigator.getGamepads() ;
        for (var i = 0; i < gamepads.length; i++) {
          var gp = gamepads[i];
          if (gp) {
            this.updateGamepad.gamepad = gp
            var buttons = []
            var axes = []
            for (var j = 0; j < gp.buttons.length; j++) {
              buttons.push(gp.buttons[j].pressed)
            }
            for (var k = 0; k < gp.axes.length; k++) {
              axes.push(gp.axes[k])
            }
            this.updateGamepad.buttons = buttons
            this.updateGamepad.axes = axes
          }
        }
      }
    },

    handle_add_event_listener : function() {
      window.addEventListener('gamepadconnected', (e) => {
        this.handle_gamepad_connection(e, true);
      });

      window.addEventListener('gamepaddisconnected', (e) => {
        this.handle_gamepad_connection(e, false);
      });
    },

    handle_gamepad_connection : function(event, connecting) {
      if (connecting) {
        console.log(
          'Previous Gamepad connected at index %d: %s. %d buttons, %d axes.',
          event.gamepad.index,
          event.gamepad.id,
          event.gamepad.buttons.length,
          event.gamepad.axes.length,
        );

        this.gamepadIsConnected = true
        this.updateGamepad.gamepad.isConnected = true

      } else {
        console.log(
          'Gamepad disconnected from index %d: %s',
          event.gamepad.index,
          event.gamepad.id,
        );

        this.gamepadIsConnected = false;
        this.updateGamepad.gamepad.isConnected = true
        delete this.gamepads[event.gamepad.index];
      }
    }
  }
};
</script>

<style scoped>

</style>
