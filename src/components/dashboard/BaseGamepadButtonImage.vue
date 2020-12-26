<template>
    <div>
        <b-img 
            v-if="!state"
            blank rounded :blank-color="disabledColor" 
            class="m-4" width="100%" height="100%" 
        ></b-img>

        <b-img 
            v-if="state"
            blank rounded :blank-color="enabledColor" 
            class="m-4" width="100%" height="100%" 
        ></b-img>
    </div>
</template>

<script>
export default {
    name : "BaseGamepadButtonImage",

    props : {
        state : {
            type : Boolean,
            default : false,
        }
    },

    data(){
        return{
            disabledColor : "#FF0000",
            enabledColor : "#00FFFF"
        }
    }
    
}
</script>