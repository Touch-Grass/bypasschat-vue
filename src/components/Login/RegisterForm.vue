<template>
  <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
    Register
  </h2>
  <form @submit.prevent="Submit">
    <label
      for="name"
      class="block text-xs font-semibold text-gray-600 uppercase py-2"
    >
      <span>Name</span>
    </label>
    <input
      v-model="registerForm.name"
      id="name"
      placeholder="Name"
      type="text"
      class="block w-full py-3 pb-3 px-1 mt-0 text-gray-500 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200 rounded-md placeholder:text-center"
      required
    />

    <label
      for="email"
      class="block text-xs font-semibold text-gray-600 uppercase py-2"
    >
      <span>Email</span>
    </label>
    <input
      v-model="registerForm.email"
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
      v-model="registerForm.password"
      id="password"
      placeholder="Password"
      type="password"
      class="block w-full py-3 px-1 mt-2 mb-4 text-gray-500 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200 rounded-md placeholder:text-center"
      autocomplete="current-password"
      required
    />
    <label
      for="repeat_password"
      class="block mt-2 text-xs font-semibold text-gray-600 uppercase py-2"
    >
      <span>Repeat Password</span>
    </label>
    <input
      v-model="registerForm.repeat_password"
      id="repeat_password"
      placeholder="Password"
      type="password"
      class="block w-full py-3 px-1 mt-2 mb-4 text-gray-500 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200 rounded-md placeholder:text-center"
      autocomplete="current-password"
      required
    />

    <button
      :class="{ fadeIn: disabled }"
      type="submit"
      class="w-full py-3 mt-5 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none"
    >
      Login
    </button>
    <slot></slot>
  </form>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const registerForm = ref({
  name: '',
  email: '',
  password: '',
  repeat_password: '',
});

const disabled = ref(false);
interface Emits {
  (e: 'showSignInModal', showSignInModal: boolean): void;
}

const emits = defineEmits<Emits>();

function Validate() {
  // Makes sures that the form doesn't submit if the user hasn't filled out all the fields
  if (Object.keys(registerForm.value).includes(''))
    return 'Please fill in all fields';

  if (registerForm.value.name.length <= 3)
    return 'Name must be at least 3 characters long';

  if (registerForm.value.name.length > 10)
    return 'Name must be less than 12 characters long';

  //If the name is letters and numbers
  if (!registerForm.value.name.match(/^[a-zA-Z0-9_]+$/))
    return 'Name must be only include characters, numbers and underscores';

  if (registerForm.value.password !== registerForm.value.repeat_password)
    return 'Passwords do not match';
}

function Submit() {
  const error = Validate();
  if (error) {
    alert(error);
    return;
  } else {
    registerUser(registerForm.value);
  }
}

function registerUser(userCredentials: Record<string, string>) {
  alert('Registering user');
}

function showSignInModal() {
  console.log('showSignInModal');
}
</script>

<style scoped>
.dont_have_account {
  cursor: pointer;
  user-select: none;
}
.dont_have_account:hover {
  color: hsl(195, 71%, 50%);
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
