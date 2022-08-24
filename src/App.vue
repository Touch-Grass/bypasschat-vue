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
import { useUserData } from "./components/Composables/composables";
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
import { ref, defineComponent } from "vue";
import { useUserData } from "./components/Composables/composables";
import LoginForm from "./components/Login/LoginForm.vue";
import ChatLayout from "./components/Chat/ChatLayout.vue";

// interface Components {
//   LoginForm: any;
//   ChatLayout: any;
// }
// const components = defineComponent<Components>();

// let loggedIn = ref(false);
let loggedIn = ref(true);

let userData = ref({
  id: null,
  name: null,
  email: null,
  image: null,
});

function logChange(e: boolean) {
  console.log(`Logged in status set to ${e}`);
  loggedIn.value = e;
}
function setUserData(e: any) {
  console.log("Setting user data!");
  userData.value = e;
  console.log(userData);
}
</script>
