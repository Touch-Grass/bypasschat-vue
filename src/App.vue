<template>
  <!-- Login menu -->
  <div v-if="!loggedIn" class="absolute top-0 login_background w-screen">
    <LoginForm @loggedIn="logChange" :renderLabels="true"></LoginForm>
  </div>

  <!-- Chat screen -->
  <div v-if="loggedIn">
    <ChatScreen>
      <ChatMessages></ChatMessages>
    </ChatScreen>
  </div>
</template>

<script lang="ts">
import LoginForm from "./components/Login/LoginForm.vue";
import ChatScreen from "./components/Chat/ChatScreen.vue";
import ChatMessages from "./components/Chat/ChatMessages.vue";
import firebaseTest from "./components/FirebaseTest.vue";
import ChatSelect from "./components/ChatSelect.vue";
import tempSignUp from "./components/SignUpForm.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: {
    LoginForm,
    ChatScreen,
    firebaseTest,
    ChatSelect,
    tempSignUp,
    ChatMessages,
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
