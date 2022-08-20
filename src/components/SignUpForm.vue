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

<script lang="ts">
import { defineComponent } from "vue";
import { auth, createUserWithEmailAndPassword } from "../main";
export default defineComponent({
  data() {
    return {
      input_email: "",
      input_name: "",
      input_password: "",
    };
  },
  methods: {
    signInAuth(email: any, password: any) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential: any) => {
          const user = userCredential.user;
          alert("Signed up!");
          console.log(user);
        })
        .catch((error: any) => {
          throw new Error(`New Error ${error.message}`);
        });
    },
  },
  components: {},
});
</script>
