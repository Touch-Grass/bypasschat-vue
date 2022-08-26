<template>
  <div v-for="id in props.chats">
    <Chat
      :chat_id="id"
      v-show="props.selected_chat === id"
      :user_id="props.userData.id"
    ></Chat>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Message from "./Message.vue";
import Chat from "./Chat.vue";

interface Props {
  userData: any;
  chats: string[];
  selected_chat: string;
}

const props = defineProps<Props>();
</script>

<style>
.message_input_wrapper {
  position: fixed;
  bottom: 0;
  right: 0;
  height: 60px;
  width: calc(100% - 250px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style scoped>
.message_input_wrapper form {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.message_input_wrapper input {
  width: calc(100% - 80px);
  height: calc(100% - 20px);
  border-radius: 5px;
}

.button_submit {
  font-family: "JetBrains Mono", monospace;
  width: 4ch;
  height: calc(100% - 20px);
  border-radius: 5px;
  background-color: var(--d-gray);
  border: none;
  color: var(--d-gray);
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: none;
  margin-left: 5px;

  display: flex;
  place-items: center;
}

.button_submit img {
  display: flex;
}
</style>
