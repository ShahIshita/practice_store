<template>
<base-card>

   <div>
    {{ userDetails.userName}}
   </div> 
   <div>
       {{ userDetails.email}}
   </div>
   <base-button @click="logout">Logout</base-button>
</base-card>
</template>

<script>
import BaseButton from './ui/BaseButton.vue';
import BaseCard from './ui/BaseCard.vue';
export default {
  components: { BaseCard, BaseButton },
  data(){
      return{
          userDetails: {},
      }
  },
  methods:{
      logout(){
        localStorage.removeItem('token');
        localStorage.removeItem("userId");
        this.$router.replace('/signin');
      }
  },
  
  computed: {
        userObj(){
            return this.$store.getters['userObj'];
        },
    },
    async created(){
        await this.$store.dispatch('fetchData');
        this.userDetails = this.userObj;
    },
  
    
    
}
</script>

