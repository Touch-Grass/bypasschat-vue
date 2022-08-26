<template>
  <div class="chat_wrapper" @click="selectedChat">
    <p>{{ chat_id }}</p>
    <img src="chat_imgs" alt="" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Stringish } from "../../../main";
import { database } from "../../../assets/typescript/firebase";
import { ref as fbref, onValue } from "firebase/database";

interface Emits {
  (e: "selectedChat", id: any): void;
}

const emits = defineEmits<Emits>();

interface Props {
  chat_id: string;
}
const props = defineProps<Props>();

initChatSelect();

function initChatSelect(chat_id = props.chat_id): void {
  console.log(`The chat is: ${chat_id}!`);
  // const chatRef = ref(database, `chats/${chat_id}`);
}

function selectedChat() {
  emits("selectedChat", props.chat_id);
}
</script>

<style scoped>
.chat_wrapper {
  width: calc(100% - 20px);
  padding: 5px;
  height: 100%;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  /* Starts the flex to align */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: block;
  /* Puts in block at the end for text-alignment */
  background-color: var(--d-gray);
}

.chat_wrapper:hover {
  background-color: var(--d-light-gray);
}

.chat_wrapper p {
  text-align: start;
  padding-left: 5px;
}
</style>
2
