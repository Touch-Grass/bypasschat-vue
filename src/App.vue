<template>
  <div v-if="!loggedIn" class="absolute top-0 login_background w-screen">
    <StartupForm
      @loggedIn="logChange"
      @userData="setUserData"
      :renderLabels="true"
    ></StartupForm>
  </div>
  <ChatLayout v-if="loggedIn" :userData="userData"></ChatLayout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { hideDropdown } from "./assets/typescript/functions";
import ChatLayout from "./components/Chat/ChatLayout.vue";
import StartupForm from "./components/Login/StartupForm.vue";
const loggedIn = ref(false);
const userData = ref({
  id: null,
  name: null,
  email: null,
  image: null,
});

function logChange(e: boolean): void {
  loggedIn.value = e;
}
function setUserData(data: any): void {
  userData.value = JSON.parse(JSON.stringify(data));
}
</script>
