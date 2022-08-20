<template>
  <!-- Login menu -->
  <div v-if="!loggedIn">
    <div class="absolute top-0 login_background w-screen">
      <LoginForm @loggedIn="logChange" renderLabels></LoginForm>
    </div>
  </div>

  <div v-if="loggedIn"><ChatScreen></ChatScreen></div>
  <!-- Chat select screen -->
  <!-- v-if="loggedIn === true" -->
  <div class="absolute top-0">
    <!-- <firebaseTest>FIREBASE </firebaseTest> -->
    <!-- <ChatSelect /> -->
  </div>
</template>

<script lang="ts">
import LoginForm from "./components/Login/LoginForm.vue";
import ChatScreen from "./components/Chat/ChatScreen.vue";
import firebaseTest from "./components/FirebaseTest.vue";
import ChatSelect from "./components/ChatSelect.vue";
import tempSignUp from "./components/SignUpForm.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  data() {
    return { loggedIn: ref(false) };
  },
  components: {
    LoginForm,
    ChatSelect,
    firebaseTest,
    ChatScreen,
  },
  methods: {
    logChange(e: boolean) {
      this.loggedIn = e;
      console.log(this.loggedIn);
    },
  },
});
</script>
