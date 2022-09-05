<template>
  <div class="chat_list_wrapper" @click="selectedChat">
    <img :src="chat.image ?? defaultChatImage" class="chat-img" />
    <p>{{ chat.name }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from "vue";
import { Stringish } from "../../../main";
import { database } from "../../../assets/typescript/firebase";
import { ref as fbref, onValue } from "firebase/database";
import { defaultChatImage } from "../../../assets/typescript/Variables";

interface Emits {
  (e: "selectedChat", id: string): void;
}

interface Props {
  chat_id: string;
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();

let chat = ref({
  name: "",
  image: "",
});

initChatSelect();

/**
 * @param {string} chat_id The ID of the chat to select
 */
function initChatSelect(chat_id: string = props.chat_id): void {
  const chatRef = fbref(database, `Chats/${chat_id}`);
  onValue(chatRef, snapshot => {
    const data = snapshot.val();
    chat.value.name = data?.name;
    chat.value.image = data?.image;
  });
}

// Returns what ever chat is selected (return is an emit to other modules)
function selectedChat() {
  emits("selectedChat", props.chat_id);
}
</script>

<style>
.chat_list_wrapper {
  width: 100%;
  padding: 5px;
  height: 100%;
  cursor: pointer;
  display: flex;

  border-radius: 10px;

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

.chat-img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  background: #ddd;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
}
</style>
