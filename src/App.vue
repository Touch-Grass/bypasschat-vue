<template>
  <!-- Login menu -->
  <div class="login_background">
    <LoginForm @formSubmit="logChange" renderLabels></LoginForm>
  </div>

  <!-- Chat select screen -->
</template>

<script lang="ts">
import LoginForm from "./components/LoginForm.vue";
import ChatSelect from "./components/LoginForm.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  data() {
    return {
      loggedIn: ref(false),
    };
  },
  components: {
    LoginForm,
  },
  methods: {
    logChange(e: boolean) {
      this.loggedIn = e;
      console.log(this.loggedIn);
    },
  },
});
</script>
