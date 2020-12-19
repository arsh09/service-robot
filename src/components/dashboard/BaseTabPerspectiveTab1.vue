<template>
    <div>
        <p>

            Please use the joystick to control the mobile base. <br>

        </p>

        <b-row>

            <b-col cols="4">
                <b-row>
                    <BaseGamepadButtonImage :state="updateGamepad.buttons[4]"/>
                </b-row>
            </b-col>


            <b-col cols="6">

                <div v-for="(axis, index) in updateGamepad.axes.slice(2,4)" :key="index"> 
                    <b-row class="my-1">
                        <b-col sm="2">
                        </b-col>
                        <b-col sm="10">
                            <b-form-input disabled :value="axis" class="m-4" type="range" min=-1 max=1 step=0.01></b-form-input>
                        </b-col>
                    </b-row>

                </div>

                
            </b-col>

        </b-row>


    </div>
</template>


<script>

import BaseGamepadButtonImage from "@/components/dashboard/BaseGamepadButtonImage"

export default {
    name : "BaseTabPerspectiveTab1",
    components : {
        BaseGamepadButtonImage,
    },

    data(){
        return{
            cmdIntervalId : 0,
        }
    },

    mounted(){
        this.cmdIntervalId = setInterval( this.handle_cmd_vel_topic , 100 )
    },

    beforeDestroy(){
        clearInterval(this.cmdIntervalId)
    },

    computed : {
        updateGamepad : {
            get(){
                return this.$store.state.gamepad
            },
            set(value){
                this.$store.dispatch("handle_variable", value);
            }
        },
        updateRos : {
            get(){
                return this.$store.state.ros
            },
            set(value){
                this.$store.dispatch("handle_variable", value);
            }
        },
    },

    methods : {
        handle_cmd_vel_topic : function(){
            if (this.updateRos.status){
                this.$store.dispatch("publish_topic_cmd_vel", {topic_name : "/cmd_vel", topic_msg_type : "geometry_msg/Twist"})
            }
        }
    }
}
</script>