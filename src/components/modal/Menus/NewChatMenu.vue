<template>
  <div class="new_chat_wrapper">
    <label class="input_label">Create a New Chat</label>
    <div class="mb-4"></div>
    <input
      type="text"
      class="new_chat_input modal_input"
      placeholder="Enter a chat name"
      v-model="newChatName"
    />
    <div class="my-1"></div>
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

async function createChat(type: ChatType): Promise<void> {
  if (!newChatName.value.trim()) return;
  const newChatPush: ThenableReference = push(fbref(database, "/Chats"));
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
.new_chat_input {
  background-color: var(--d-gray);
  padding: 0.75rem;
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
