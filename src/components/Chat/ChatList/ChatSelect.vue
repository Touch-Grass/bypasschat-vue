<template>
  <div class="chat_list_wrapper" @click="selectedChat">
    <img src="chat_imgs" alt="chat image" />
    <p>{{ chat_id }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Stringish } from "../../../main";
import { database } from "../../../assets/typescript/firebase";
import { ref as fbref, onValue } from "firebase/database";

interface Emits {
  (e: "selectedChat", id: string): void;
}

interface Props {
  chat_id: string;
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();

initChatSelect();

/**
 * @param {string} chat_id The ID of the chat to select
 */
function initChatSelect(chat_id: Stringish = props.chat_id): void {
  console.log(`The chat is: ${chat_id}!`);
  // const chatRef = ref(database, `chats/${chat_id}`);
}

// Returns what ever chat is selected (return is an emit to other modules)
function selectedChat() {
  emits("selectedChat", props.chat_id);
}
</script>

<style>
.chat_list_wrapper {
  width: calc(100% - 20px);
  padding: 5px;
  height: 100%;
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

.chat_list_wrapper:hover {
  background-color: var(--d-light-gray);
}

.chat_list_wrapper p {
  text-align: start;
  padding-left: 5px;
}
</style>
