<template>
    <div>
        <p>

            Please use the joystick to control the mobile base. <br>

        </p>

        <b-row>

            <b-col cols="4">
                <b-row>
                    <div v-for="(button, index) in updateGamepad.buttons.slice(0,4)" :key="index">
                        <b-col cols="4">
                            <BaseGamepadButtonImage :state="button"/>
                        </b-col>
                    </div>
                </b-row>

                <b-row>
                    <div v-for="(button, index) in updateGamepad.buttons.slice(4,8)" :key="index">
                        <b-col cols="4">
                            <BaseGamepadButtonImage :state="button"/>
                        </b-col>
                    </div>
                </b-row>

                <b-row>
                    <div v-for="(button, index) in updateGamepad.buttons.slice(8,12)" :key="index">
                        <b-col cols="4">
                            <BaseGamepadButtonImage :state="button"/>
                        </b-col>
                    </div>
                </b-row>

                <b-row>
                    <div v-for="(button, index) in updateGamepad.buttons.slice(12,16)" :key="index">
                        <b-col cols="4">
                            <BaseGamepadButtonImage :state="button"/>
                        </b-col>
                    </div>
                </b-row>
            </b-col>


            <b-col cols="6">

                <div v-for="(axis, index) in updateGamepad.axes" :key="index"> 
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

    computed : {
        updateGamepad : {
            get(){
                return this.$store.state.gamepad
            },
            set(value){
                this.$store.dispatch("handle_variable", value);
            }
        },
    },
}
</script>