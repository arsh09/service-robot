<template>
    <div>
        <Joystick/>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">Service Robot</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-nav-form>
            <b-form-input 
                v-model="updateRos.ip"
                size="sm" class="mr-sm-2" placeholder="Robot IP Address" 
            
            ></b-form-input>
                <b-button 
                    v-if="!updateRos.status"
                    @click="$store.dispatch('connect_to_ros')"
                    size="sm" class="my-2 my-sm-0" variant="info"
                >   Connect
                </b-button>

                <b-button 
                    v-if="updateRos.status"
                    @click="$store.dispatch('disconnect_to_ros')"
                    size="sm" class="my-2 my-sm-0" variant="danger"
                >   Disconnect
                </b-button>
            </b-nav-form>
            
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    </div>
</template>

<script>

import Joystick from "@/components/Joystick.vue"

export default {
    name : "BaseTopNavigation",
    components : {
        Joystick
    },

    data(){
    return {
        
    }
    },

    computed : {
        updateRos : {
            get(){
                return this.$store.state.ros
            },
            set(value){
                this.$store.dispatch("handle_variable", value);
            }
        },
    },
}
</script>