<template>
  <div class="bg-gray-400 main_wrapper">
    <!-- <div class="bg-gray-800 sidebar_selector"></div> -->
    <div class="bg-gray-600 chat_selector"></div>
    <div class="chat_area">
      <ChatScreen></ChatScreen>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ChatScreen from "./ChatScreen.vue";

//Variables
const message_input = ref("");

//Functions
function sendMessage() {
  console.log(message_input.value);
  message_input.value = "";
}
</script>

<style scoped>
.main_wrapper {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 250px 1fr;
  /* ^^^ Sidebar, Chat selector, Main Chat pannel  */
  grid-template-rows: 1fr 90px;
}

@media (max-width: 640px) {
  .message_input_wrapper {
    width: calc(100% - 155px) !important;
  }
  .main_wrapper {
    grid-template-columns: 155px 1fr;
    grid-template-rows: 1fr 90px;
  }
}

.sidebar_selector,
.chat_selector {
  height: 100vh;
}
.message_input_wrapper {
  height: 75px;
  width: calc(100% - 250px);
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.chat_area {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
}
.message_input_wrapper form {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.message_input_wrapper input {
  width: calc(100% - 70px);
  height: calc(100% - 40px);
}
</style>
