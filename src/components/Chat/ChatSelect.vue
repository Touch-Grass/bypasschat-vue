<template>
  <div class="chat_wrapper">
    {{ chat_id }}
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { Stringish, database } from "../../main";
import { ref, onValue } from "firebase/database";

interface Props {
  chat_id: Stringish;
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: blue;
}
</style>
2
