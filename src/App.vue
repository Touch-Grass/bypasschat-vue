<template>
  <!-- Login menu -->
  <div class="absolute top-0 login_background w-screen">
    <LoginForm @formSubmit="logChange" renderLabels></LoginForm>
  </div>

  <!-- Chat select screen -->
  <!-- <div class="absolute top-0">
    <ChatSelect />
  </div> -->
</template>

<script lang="ts">
import LoginForm from "./components/LoginForm.vue";
import ChatSelect from "./components/ChatSelect.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  data() {
    return { loggedIn: ref(false) };
  },
  components: {
    LoginForm,
    ChatSelect,
  },
  methods: {
    logChange(e: boolean) {
      this.loggedIn = e;
      console.log(this.loggedIn);
    },
  },
});
</script>
