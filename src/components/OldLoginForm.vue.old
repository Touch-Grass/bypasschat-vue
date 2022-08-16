<script lang="ts">
export default {
  data() {
    return {
      input_username: "",
      input_password: "",
    };
  },
  methods: {
    inputCheck(e: KeyboardEvent) {
      const input = e.target as HTMLInputElement;
      if (input.value.length >= 5) {
        input.classList.remove(
          "border-solid",
          "border-2",
          "border-red-500",
          "invalid",
        );
      } else {
        input.classList.add(
          "border-solid",
          "border-2",
          "border-red-500",
          "invalid",
        );
      }
    },
    login() {
      const inputs = document.querySelectorAll(
        "input",
      ) as unknown as HTMLInputElement[];
      for (const input of inputs) {
        if (input.classList.contains("invalid")) {
          console.log("Cant submit");
        } else {
          console.log("Subitted!");
        }
      }
    },
  },
};
</script>

<template>
  <div>
    <input
      @keydown="inputCheck($event)"
      v-model="input_username"
      type="text"
      placeholder="username"
      class=""
    />
    <input
      @keydown="inputCheck($event)"
      v-model="input_password"
      type="password"
      placeholder="password"
    />
  </div>
  <button class="bg-white text-black" @click="login()">Login</button>
  <br />
  <span>Username: {{ input_username }}</span>
  <br />
  <span>Password: {{ input_password }}</span>
</template>

<style scoped>
input:focus {
  outline: none;
}
</style>
