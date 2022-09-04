<template>
  <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
    Login
    <h5
      v-show="signInError"
      class="error_signing_in text-red-800 text-base block mt-2 font-extrabold"
    >
      Error Signing In!
    </h5>
  </h2>
  <form @submit.prevent="Submit">
    <label
      for="email"
      class="block text-xs font-semibold text-gray-600 uppercase py-2"
    >
      <span>Email</span>
    </label>
    <input
      v-model="input_email"
      id="email"
      placeholder="Email"
      type="email"
      class="block w-full py-3 px-1 mt-2 text-gray-500 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200 rounded-md placeholder:text-center"
      autocomplete="email"
      required
    />

    <label
      for="password"
      class="block mt-2 text-xs font-semibold text-gray-600 uppercase py-2"
    >
      <span>Password</span>
    </label>
    <input
      v-model="input_password"
      id="password"
      placeholder="Password"
      type="password"
      class="block w-full py-3 px-1 mt-2 mb-4 text-gray-500 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200 rounded-md placeholder:text-center"
      autocomplete="current-password"
      required
    />

    <button
      :class="{ fadeIn: disabled }"
      type="submit"
      class="w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none"
    >
      Login
    </button>
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from "vue";
import { auth, database } from "../../assets/typescript/firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  UserCredential,
} from "firebase/auth";
import { ref as fbref, onValue } from "firebase/database";

const signInError = ref(false);
const formBase: Ref<HTMLDivElement | undefined> = ref();
const input_email = ref("");
const input_password = ref("");
const disabled = ref(false);

interface Emits {
  (e: "loggedIn", loggedIn: boolean): void;
  (e: "userData", userData: object): void;
}

const emits = defineEmits<Emits>();

/**
 * Signs into the firebase
 */
function signInAuth(email: any, password: any) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential: any) => {})
    .catch((error) => {
      signInError.value = true;
      disabled.value = true;
      setTimeout(() => {
        signInError.value = false;
        disabled.value = true;
      }, 3000);
      throw new Error(`New Error ${error.message}`);
    });
}

function Submit(): void {
  // loggedIn = true;
  // emits("loggedIn", loggedIn);
  signInAuth(input_email.value, input_password.value);
}

function checkSignIn(): void {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      // Sends info to the firebase
      onValue(fbref(database, `/Users/${uid}`), (data: any) => {
        if (!data) {
          signInError.value = true;
          disabled.value = true;
          setTimeout(() => {
            signInError.value = false;
            disabled.value = true;
          }, 3000);
          console.log(signInError);
          throw new Error("No account data");
        }
        let userData = {
          id: data.val().id,
          name: data.val().name,
          email: data.val().email,
          image: data.val().image,
        };
        emits("userData", userData);
        emits("loggedIn", true);
      });
    } else {
      emits("loggedIn", false);
    }
  });
}

onMounted(() => {
  checkSignIn();
});
</script>

<style scoped>
.form_switcher {
  cursor: pointer;
  color: darkred;
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
