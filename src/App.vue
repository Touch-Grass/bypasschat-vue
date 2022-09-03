<template>
  <!-- Login menu -->
  <div v-show="!loggedIn" class="absolute top-0 login_background w-screen">
    <StartupForm
      @loggedIn="logChange"
      @userData="setUserData"
      :renderLabels="true"
    ></StartupForm>
  </div>

  <!-- Chat screen -->
  <ChatLayout v-if="loggedIn" :userData="useUserData(userData)"></ChatLayout>
</template>

<script lang="ts" setup>
import { ref, defineComponent, Ref } from "vue";
import StartupForm from "./components/Login/StartupForm.vue";
import ChatLayout from "./components/Chat/ChatLayout.vue";
import { useUserData } from "./assets/typescript/Composables/useUserData";
// interface Components {
//   LoginForm: any;
//   ChatLayout: any;
// }
// const components = defineComponent<Components>();

const loggedIn = ref(false);

const userData = ref({
  id: null,
  name: null,
  email: null,
  image: null,
});

function logChange(e: boolean): void {
  console.log(`Logged in status set to ${e}`);
  loggedIn.value = e;
}
function setUserData(e: any): void {
  console.log("Setting user data!");
  userData.value = e;
  console.log(userData);
}
</script>
