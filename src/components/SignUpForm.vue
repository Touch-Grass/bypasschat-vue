<template>
  <form @submit="signInAuth(input_email, input_password)" method="post">
    <div
      class="flex justify-center items-center h-screen w-screen bg-gray-400 rounded-md shadow-md"
    >
      <input
        v-model="input_email"
        placeholder="email"
        type="email"
        class="block w-full py-3 px-1 mt-2 text-gray-500 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200 rounded-md placeholder:text-center"
      />
      <input
        v-model="input_name"
        placeholder="name"
        type="text"
        class="block w-full py-3 px-1 mt-2 text-gray-500 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200 rounded-md placeholder:text-center"
      />
      <input
        v-model="input_password"
        placeholder="password"
        type="text"
        class="block w-full py-3 px-1 mt-2 text-gray-500 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200 rounded-md placeholder:text-center"
      />
      <button type="submit">Submitlol</button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { auth } from "../assets/typescript/firebase";
import {
  createUserWithEmailAndPassword,
  User,
  UserCredential,
} from "firebase/auth";
import { ref } from "vue";
const input_email = ref("");
const input_name = ref("");
const input_password = ref("");
function signInAuth(email: string, password: string) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential: UserCredential) => {
      const user: User = userCredential.user;
      alert("Signed up!");
      console.log(user);
    })
    .catch((e: Error) => {
      throw new Error(`New Error ${e.message}`);
    });
}
</script>
