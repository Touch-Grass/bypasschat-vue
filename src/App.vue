<template>
  <!-- Login menu -->
  <div v-if="!loggedIn" class="absolute top-0 login_background w-screen">
    <LoginForm @loggedIn="logChange" :renderLabels="true"></LoginForm>
  </div>

  <!-- Chat screen -->
  <ChatLayout v-if="loggedIn"></ChatLayout>
</template>

<script lang="ts">
import LoginForm from "./components/Login/LoginForm.vue";
import ChatLayout from "./components/Chat/ChatLayout.vue";
import ChatScreen from "./components/Chat/ChatScreen.vue";
import ChatSelect from "./components/Chat/ChatSelect.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    LoginForm,
    ChatLayout,
    ChatScreen,
    ChatSelect,
  },
  data() {
    return {
      loggedIn: false,
    };
  },
  methods: {
    logChange(e: boolean) {
      this.loggedIn = e;
      console.log(this.loggedIn);
    },
  },
});
</script>
