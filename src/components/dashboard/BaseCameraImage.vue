<template>
    
    <div>
        <b-img 
            :src="imageSrc"
            fluid alt="Camera feed from base"
            
            >
        </b-img>
    </div>

</template>

<script>
export default {

    name : "BaseCameraImage",
    data(){
        return{
            imageSrc : "",
            imgWidth : 1024,
            imgHeight : 650,
            imgQuality : 50,
            imgTopic : "/camera1/rgb/image_raw"
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

    watch : {
        updateRos : {
            handler(newVal) {
                if (newVal.status){
                    this.handle_subscribe_camera()
                } else {
                    this.imgSrc = ""
                }
            },
            deep : true,
        }
    },

    methods : {
        handle_subscribe_camera : function(){
             this.imageSrc = 'http://' + this.$store.state.ros.ip +  ':8080/stream?topic=' + this.imgTopic + '&type=mjpeg&quality=' + this.imgQuality + '&width=' + this.imgWidth + '&height=' + this.imgHeight 
             console.log(this.imageSrc)
        }
    }
    

}
</script>