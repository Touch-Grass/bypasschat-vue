<template>
  <div class="list_wrapper">
    <ul v-for="id in chats">
      <ChatSelect :chat_id="id"></ChatSelect>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import ChatSelect from "./ChatSelect.vue";
import { ref } from "vue";

const chats = ["hi", "hello", "bye"];
</script>

<style scoped>
.list_wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: red;
}

.list_wrapper > ul {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}
</style>
