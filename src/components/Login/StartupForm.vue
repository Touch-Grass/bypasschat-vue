<template>
  <div class="flex flex-col h-screen">
    <div class="grid place-items-center mx-2 my-auto">
      <div
        ref="formBase"
        class="px-[3rem] py-[0.8rem] bg-white shadow-2xl rounded-lg"
      >
        <LoginForm
          v-if="toggleForm"
          @loggedIn="(val: boolean) => {emits('loggedIn', val)}"
          @userData="
            (data) => {
              emits('userData', data);
            }
          "
        >
          <h6 @click="toggleForm = false" class="form_switch_text">
            &nbsp; Don't have an account? Click here! &nbsp;
          </h6>
        </LoginForm>
        <RegisterForm v-if="!toggleForm">
          <h6 @click="toggleForm = true" class="form_switch_text">
            Already have an account? Click here!
          </h6>
        </RegisterForm>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, Ref } from "vue";
import LoginForm from "./LoginForm.vue";
import { Transition } from "vue";
import RegisterForm from "./RegisterForm.vue";
const showRegister = ref(false);

const toggleForm = ref(true);

interface Emits {
  (e: "loggedIn", loggedIn: boolean): void;
  (e: "userData", userData: object): void;
}

// interface Props {
// }

const emits = defineEmits<Emits>();
// const props = defineProps<Props>();
</script>

<style scoped>
.form_switch_text {
  color: rgb(239 68 68);
  font-weight: 500;
  cursor: pointer;
}
.fadeIn {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}
</style>
