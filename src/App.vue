<template>
  <!-- Login menu -->
  <div v-show="!loggedIn" class="absolute top-0 login_background w-screen">
    <LoginForm
      @loggedIn="logChange"
      @userData="setUserData"
      :renderLabels="true"
    ></LoginForm>
  </div>

  <!-- Chat screen -->
  <ChatLayout v-if="loggedIn" :userData="useUserData(userData)"></ChatLayout>
</template>
<!--
<script lang="ts">
import LoginForm from "./components/Login/LoginForm.vue";
import ChatLayout from "./components/Chat/ChatLayout.vue";
// import ChatScreen from "./components/Chat/ChatScreen/ChatScreen.vue";
// import ChatSelect from "./components/Chat/ChatSelect.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    LoginForm,
    ChatLayout,
    // ChatScreen,
    // ChatSelect,
  },
  data() {
    return {
      loggedIn: false,
      // loggedIn: true,
      userData: {
        id: null,
        name: null,
        email: null,
        image: null,
      },
    };
  },
  methods: {
    logChange(e: boolean) {
      this.loggedIn = e;
      console.log(this.loggedIn);
    },
    setUserData(e: any) {
      console.log("Setting user data!");
      this.userData = e;
      console.log(this.userData);
    },
  },
});
</script> -->

<script lang="ts" setup>
import { ref, defineComponent, Ref } from "vue";
import LoginForm from "./components/Login/LoginForm.vue";
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
