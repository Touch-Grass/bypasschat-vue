<!-- <script lang="ts">
export function useUserID(user: any | null) {
  // state encapsulated and managed by the composable
  let userData = {
    id: ref(user.uid),
    name: ref("Bob"),
    email: ref("bob@gmail.com"),
    image: ref("https://picsum.photos/200/300"),
  };

  // a composable can update its managed state over time.
  function updateUserInfo() {
    userData.id.value = user?.uid;
    userData.name.value = user?.displayName;
    userData.email.value = user?.email;
    userData.image.value = user?.photoURL;
  }

  // a composable can also hook into its owner component's
  // lifecycle to setup and teardown side effects.
  onMounted(() => window.addEventListener("mousemove", updateUserInfo));
  onUnmounted(() => window.removeEventListener("mousemove", updateUserInfo));

  // expose managed state as return value
  return { userData };
}
</script> -->

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, Ref } from "vue";
import { auth, database } from "../../assets/typescript/firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  UserCredential,
} from "firebase/auth";
import { ref as fbref, onValue } from "firebase/database";
import { mainModule } from "process";
import { sign } from "crypto";
let loggedIn: boolean = false;
const signInError = ref(false);
const formBase: Ref<HTMLDivElement | undefined> = ref();
const input_email = ref("");
const input_password = ref("");
const disabled = ref(false);

interface Emits {
  (e: "loggedIn", loggedIn: boolean): void;
  (e: "userData", userData: object): void;
}

interface Props {
  renderLabels?: boolean;
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();

function signInAuth(email: any, password: any) {
  console.groupCollapsed("Sign in credentials");
  console.log("Email");
  console.log(email);
  console.log("Password");
  console.log(password);
  console.groupEnd();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential: any) => {
      // const user = userCredential.user;
      // alert("Signed in!");
    })
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
      console.log("User signed in!");
      const uid = user.uid;
      // Sends info to the firebase
      onValue(fbref(database, `/Users/${uid}`), (data) => {
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
        loggedIn = true;
        emits("loggedIn", loggedIn);
      });
    } else {
      console.log("User signed out!");
      loggedIn = false;
      emits("loggedIn", loggedIn);
    }
  });
}

onMounted(() => {
  // // Testing only emit
  // let userData = {
  //   id: "abcd1234",
  //   name: "Bob",
  //   email: "bob@gmail.com",
  //   image: "https://picsum.photos/200/300",
  // };
  // emits("userData", userData);
  // loggedIn = true;
  // emits("loggedIn", loggedIn);
  // auth.signOut();
  checkSignIn();
});
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="grid place-items-center mx-2 my-auto">
      <div
        ref="formBase"
        class="px-[3rem] py-[0.8rem] bg-white shadow-2xl rounded-lg"
      >
        <h2
          class="text-center font-semibold text-3xl lg:text-4xl text-gray-800"
        >
          <slot>Login</slot>
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
            ><span v-if="renderLabels">Email</span></label
          >
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
            <span v-if="renderLabels">Password</span></label
          >
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
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fadeIn {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
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
