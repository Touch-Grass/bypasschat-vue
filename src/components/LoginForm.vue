<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      input_email: "",
      input_password: "",
    };
  },
  methods: {
    Submit() {
      console.log(this.input_email);
      console.log(this.input_password);
    },
  },
});
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="grid place-items-center mx-2 my-20 sm:my-auto">
      <div
        class="px-[3rem] py-[3rem] bg-white rounded-lg shadow-md lg:shadow-lg"
      >
        <h2
          class="text-center font-semibold text-3xl lg:text-4xl text-gray-800"
        >
          Login
        </h2>

        <form @submit.prevent="Submit">
          <label
            for="email"
            class="block text-xs font-semibold text-gray-600 uppercase py-2"
            >E-mail</label
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
            >Password</label
          >
          <input
            id="password"
            placeholder="password"
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
