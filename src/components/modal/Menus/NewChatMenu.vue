<template>
  <label class="input_label">Create a new chat!</label>
  <div class="new_chat_wrapper">
    <input
      type="text"
      class="new_chat_input"
      placeholder="Enter a chat name"
      v-model="newChatName"
    />
    <button
      class="new_chat_button private_chat_button"
      @click="createChat(ChatType.private)"
    >
      Private Chat
    </button>
    <div class="mt-3"></div>
    <button
      class="new_chat_button group_chat_button"
      @click="createChat(ChatType.group)"
    >
      Group Chat
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { database } from "../../../assets/typescript/firebase";
import { ref as fbref, push, set, ThenableReference } from "firebase/database";

interface Props {
  userData: any;
}

const props = defineProps<Props>();

enum ChatType {
  private = "private",
  group = "group",
}

const newChatName = ref("");

function createChat(type: ChatType): void {
  console.log(type);
  let newChatPush: ThenableReference = push(fbref(database, "/Chats"));
  set(newChatPush, {
    name: newChatName.value,
  });

  let userChatPush: ThenableReference = push(
    fbref(database, `/Users/${props.userData.id}/Chats`)
  );
  set(userChatPush, {
    id: newChatPush.key,
    order: 0,
  });
}
</script>

<style scoped>
.new_chat_wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.new_chat_button {
  background: var(--d-blue);
  border: transparent;
  padding: 0.75rem;
}
.new_chat_button:active {
  background: var(--d-blue-clicked);
}
</style>
