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
import {
  ref as fbref,
  push,
  set,
  get,
  ThenableReference,
  DatabaseReference,
  child,
} from "firebase/database";
import { getMemoedVNodeCall } from "@vue/compiler-core";
import { UserData } from "../../../assets/typescript/types";

interface Props {
  userData: UserData;
}

const props = defineProps<Props>();

enum ChatType {
  private = "private",
  group = "group",
}

const newChatName = ref("");

function createChat(type: ChatType): void {
  if (!newChatName.value.trim()) return;
  const newChatPush: ThenableReference = push(fbref(database, "/Chats"));
  set(newChatPush, { name: newChatName.value });

  const userChats: DatabaseReference = fbref(
    database,
    `/Users/${props.userData.id}/Chats/${newChatPush.key}`
  );
  set(userChats, { id: newChatPush.key, order: 0 });
  newChatName.value = "";
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
  background-color: var(--theme-main);
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
