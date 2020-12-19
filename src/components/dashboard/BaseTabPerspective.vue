<template>
    <div>
        
        <Joystick/>
        <b-tabs content-class="mt-4" class="mt-2 mr-2 ml-2">
            <b-tab title="Joystick Control" active>
                <BaseTabPerspectiveTab1/>
            </b-tab>
            <b-tab title="Autonomous Navigation"><p>Space for autonomous navigation</p></b-tab>
            <b-tab title="Robot Arm Control" ><p>robotic arm control here!</p></b-tab>
        </b-tabs>
    </div>

</template>


<script>


import Joystick from "@/components/Joystick.vue"
import BaseTabPerspectiveTab1 from "@/components/dashboard/BaseTabPerspectiveTab1.vue"

export default {
    name : "BaseTabPerspective",
    components : {
        Joystick,
        BaseTabPerspectiveTab1 
    }
}
</script>