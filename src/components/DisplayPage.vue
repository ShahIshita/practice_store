<template>
<base-card>
   <div>
    {{ userDetail.userName}}
   </div> 
   <div>
       {{ userDetail.email}}
   </div>
</base-card>
</template>

<script>
import BaseCard from './ui/BaseCard.vue';
export default {
  components: { BaseCard },
    created() {
        console.log(this.$store.getters['test']);
        let obj1=[]
       obj1.userName = localStorage.getItem("userName");
       obj1.email = localStorage.getItem("email");
    this.$store.dispatch("demo", obj1);
    },
    computed: {
     userDetail() {
         return this.$store.getters['test']
     }
    }
}
</script>

