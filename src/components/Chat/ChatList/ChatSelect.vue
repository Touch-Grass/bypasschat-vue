<template>
  <div class="chat_wrapper">
    <p>{{ chat_id }}</p>
    <img src="chat_imgs" alt="" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { Stringish } from "../../../main";
import { database } from "../../../assets/typescript/firebase";
import { ref, onValue } from "firebase/database";

interface Props {
  chat_id: string;
}
const props = defineProps<Props>();

function initChatSelect(chat_id = props.chat_id) {
  console.log(`The chat is: ${chat_id}!`);
  // const chatRef = ref(database, `chats/${chat_id}`);
}

onMounted(() => {
  initChatSelect();
});
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
