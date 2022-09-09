<template>
  <div class="chat_container">
    <Chat
      v-for="chat in props.chats"
      :chat_id="chat.id"
      v-show="props.selected_chat === chat.id"
      :user_id="(props.userData.id as string)"
      @chatUpdated="updateChats"
    ></Chat>
  </div>
</template>

<script lang="ts" setup>
import Chat from "./Chat.vue";
import { database } from "../../../assets/typescript/firebase";
import {
  ref as fbref,
  onValue,
  set,
  orderByChild,
  query,
  child,
  off,
  onChildAdded,
} from "firebase/database";
import { UserData } from "../../../assets/typescript/types";

interface Props {
  userData: UserData;
  chats: any[];
  selected_chat: string;
}

const props = defineProps<Props>();

function updateChats(chat_id: string) {
  console.log("updating chats");
  const chatsRef = fbref(database, `Users/${props.userData.id}/Chats`);
  set(child(chatsRef, `${chat_id}/order`), 1);
  onValue(chatsRef, snapshot => {
    if (snapshot.exists()) {
      const arrangeChats: Record<string, number>[] = [];
      snapshot.forEach((chat: any) => {
        if (chat.key === chat_id) return;
        // set(child(chatsRef, `${chat.key}/order`), orderCount);
        arrangeChats.push({
          id: chat.key,
          order: chat.val().order,
        });
      });
      arrangeChats.sort((a, b) => {
        return a.order - b.order;
      });
      console.log(arrangeChats);

      let orderCount: number = 2;
      arrangeChats.forEach((chat: any) => {
        set(child(chatsRef, `${chat.id}/order`), orderCount);
        orderCount += 1;
      });
    }
  });
}
</script>

<style scoped>
.chat_container {
  width: 100%;
  height: 100%;
}
</style>

<!-- <style>
.message_input_wrapper {
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
  background-color: var(--theme-main);
  border: none;
  color: var(--theme-main);
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
</style> -->
