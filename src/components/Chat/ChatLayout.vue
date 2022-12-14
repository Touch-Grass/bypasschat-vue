<template>
  <div class="main_wrapper">
    <div v-if="props.userData.id === null" class="not_logged_in">
      <h1>Error, you are not logged in!</h1>
      <p>
        Click <a href="#" @click="reloadLocation">here</a> to try to reload the
        page
      </p>
    </div>

    <div v-if="props.userData.id !== null" class="chat_selector">
      <ChatList
        :userData="props.userData"
        :chats="chats"
        @selectedChat="changeChat"
        @toggleModal="toggleModals"
      ></ChatList>
    </div>

    <div v-if="props.userData.id !== null" class="chat_area">
      <ChatScreen
        :chats="chats"
        :selected_chat="selected_chat"
        :userData="props.userData"
      ></ChatScreen>
    </div>
  </div>

  <ModalLayout
    :userData="props.userData"
    :modalData="modalData"
    :chats="chats"
    @toggleModal="toggleModals"
  ></ModalLayout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { database } from "../../assets/typescript/firebase";
import {
  ref as fbref,
  onChildAdded,
  DatabaseReference,
  DataSnapshot,
} from "firebase/database";
import ChatScreen from "./ChatScreen/ChatScreen.vue";
import ChatList from "./ChatList/ChatList.vue";
import ModalLayout from "../modal/ModalLayout.vue";
import {
  ChatType,
  TypeModalData,
  UserData,
} from "../../assets/typescript/types";

interface Props {
  userData: UserData;
}

const props = defineProps<Props>();

const chats: any[] = [];
const selected_chat = ref("");

const modalData: TypeModalData = ref({
  settings: false,
  friends: false,
  profile: false,
  newChat: false,
});

function toggleModals(selector: string, mode: boolean): void {
  if (selector === "all") {
    modalData.value.settings = mode;
    modalData.value.friends = mode;
    modalData.value.profile = mode;
    modalData.value.newChat = mode;
  } else {
    modalData.value[selector] = mode;
  }
}

function changeChat(id: string): void {
  selected_chat.value = id;
}

function reloadLocation(): void {
  location.reload();
}

getChats();

function getChats() {
  const userChatsRef: DatabaseReference = fbref(
    database,
    `Users/${props.userData.id}/Chats`
  );
  onChildAdded(userChatsRef, (data: DataSnapshot) => {
    chats.push({
      id: data.val().id,
    });
  });
}
</script>

<style>
.main_wrapper {
  background-color: var(--theme-main);
  width: 100vw;
  display: grid;
  grid-template-columns: 250px 1fr;
  /* ^^^ Chat selector, Main Chat pannel  */
  grid-template-rows: 1fr;
  overflow: hidden;
}
</style>
