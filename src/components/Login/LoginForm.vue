<script lang="ts" setup>
// import { EmailAuthProvider } from "@firebase/auth";
import { ref, onMounted } from "vue";
import { auth, Booleanish } from "../../main";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
let loggedIn: boolean = false;
const formBase = ref();
let input_email: string = "";
let input_password: string = "";

interface Emits {
  (e: "loggedIn", loggedIn: boolean): void;
}

interface Props {
  renderLabels?: boolean;
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();

function signInAuth(email: any, password: any) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Signed in!");
    })
    .catch((error) => {
      throw new Error(`New Error ${error.message}`);
    });
}

function Submit() {
  loggedIn = true;
  emits("loggedIn", loggedIn);
  signInAuth(input_email, input_password);
}

function checkSignIn() {
  console.log("Checking!");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Signed In!");
      const uid = user.uid;
      loggedIn = true;
      emits("loggedIn", loggedIn);
    } else {
      console.log("Not signed in");
    }
  });
}

onMounted((): void => {
  // Todo: Fix this code. Maybe async await is needed. https://vuejs.org/guide/built-ins/suspense.html#async-setup
  setTimeout(() => {
    checkSignIn();
  }, 100);
});
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="grid place-items-center mx-2 my-auto">
      <div
        ref="formBase"
        class="px-[3rem] py-[0.8rem] bg-white rounded-lg shadow-lg"
      >
        <h2
          class="text-center font-semibold text-3xl lg:text-4xl text-gray-800"
        >
          <slot>Login</slot>
        </h2>
        <form @submit.prevent="Submit">
          <label
            for="email"
            class="block text-xs font-semibold text-gray-600 uppercase py-2"
            ><span v-if="renderLabels">Email</span></label
          >
          <input
            id="email"
            placeholder="Email"
            v-model="input_email"
            type="email"
            class="block w-full py-3 px-1 mt-2 text-gray-500 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200 rounded-md placeholder:text-center"
            autocomplete="email"
            required
          />

          <label
            for="password"
            class="block mt-2 text-xs font-semibold text-gray-600 uppercase py-2"
          >
            <span v-if="renderLabels">Password</span></label
          >
          <input
            id="password"
            placeholder="Password"
            v-model="input_password"
            type="password"
            class="block w-full py-3 px-1 mt-2 mb-4 text-gray-500 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200 rounded-md placeholder:text-center"
            autocomplete="current-password"
            required
          />

          <button
            type="submit"
            class="w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
