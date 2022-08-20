<script lang="ts">
import { EmailAuthProvider } from "@firebase/auth";
import { defineComponent, ref, onMounted } from "vue";
import {
  auth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "../../main";
// Exports the component definition as a Vue component named LoginForm. This is very common and you don't need to fully understand it right now.
export default defineComponent({
  name: "LoginForm", //Sets the component name to LoginForm.
  data() {
    //The data() method returns an object that contains the component data.
    return {
      //Variables that are used in the template.
      formBase: ref(),
      loggedIn: ref(false),
      input_email: "",
      input_password: "",
    };
  },
  methods: {
    // Methods, ex @click="methodName" or @input="methodName($event, args)" Very similar to addEventListener in TypeScript.
    Submit() {
      this.loggedIn = true;
      this.$emit("loggedIn", this.loggedIn);

      this.signInAuth(this.input_email, this.input_password);

      // Todo: Add login logic (send to firebase)
      // console.log(this.input_email);
      // console.log(this.input_password);
    },
    signInAuth(email: any, password: any) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          alert("Signed in!");

          // console.log(user);
        })
        .catch((error) => {
          throw new Error(`New Error ${error.message}`);
        });
    },
    checkSignIn() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("Signed In!");
          const uid = user.uid;
          this.loggedIn = true;
          this.$emit("loggedIn", this.loggedIn);
        } else {
          console.log("Not signed in");
        }
      });
      console.log("Checking sign in");
    },
  },

  mounted() {
    // Todo: Fix this code. Maybe async await is needed. https://vuejs.org/guide/built-ins/suspense.html#async-setup
    setTimeout(() => {
      this.checkSignIn();
    }, 10);
  },
  props: {
    // Props like {{ prop }} or v-bind="prop"
    renderLabels: {
      type: Boolean,
    },
  },
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
