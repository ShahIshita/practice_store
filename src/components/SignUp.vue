<template>
  <div>
    <base-card>
      <h2>Form</h2>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="userName">Name: </label>
          <input typ="text" id="userName" v-model.trim="userName" required />
        </div>
        <br />
        <div class="form-control">
          <label for="email">E-Mail: </label>
          <input type="email" id="email" v-model.trim="email" required />
        </div><br>
         <div class="form-control">
          <label for="password">Password: </label>
          <input type="password" id="password" v-model.trim="password" required />
        </div>
        <br />

        <base-button>SignUp</base-button>
      </form>
      <br />
      <router-link to="/display">Go to Display</router-link>
    </base-card>
  </div>
</template>

<script>
import BaseButton from "./ui/BaseButton.vue";
import BaseCard from "./ui/BaseCard.vue";

export default {
  components: {
    BaseButton,
    BaseCard,
  },
  data() {
    return {
      userName: "",
      email: "",
      password: "",
    };
  },

  methods: {
    async submitForm() {
      this.$store.dispatch("demo", {
        userName: this.userName,
        email: this.email,
        password: this.password,
      });

     

      // this.$router.push("/display");
    },
  },
  // created() {
  //   console.log(this.$store.getters["test"]);
  // },
};
</script>