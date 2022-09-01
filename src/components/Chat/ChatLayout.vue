<template>
  <div @click="dismissSettings($event)" class="main_wrapper">
    <div v-if="props.userData.id === null" class="not_logged_in">
      <h1>Error, you are not logged in!</h1>
      <p>
        Click <a href="#" @click="reloadLocation">here</a> to try to reload the
        page
      </p>
    </div>

    <div v-if="props.userData.id !== null" class="chat_selector">
      <!-- <Modal @toggledVisible="false" :showModal="true"></Modal> -->
      <ChatList
        :userData="props.userData"
        :chats="chats"
        @selectedChat="changeChat"
        @toggleSettings="toggleSettings"
        @toggleModal="toggleModal"
      ></ChatList>
    </div>

    <div v-if="props.userData.id !== null" class="chat_area">
      <ChatScreen
        :chats="chats"
        :selected_chat="selected_chat"
        :userData="props.userData"
      ></ChatScreen>
    </div>
    <SettingsMenu v-show="settings_open" />
  </div>

  <Modal
    @toggledVisible="hideFriendsMenu"
    :showModal="friendsMenu"
    class="z-1000"
    >This is a cool modal!</Modal
  >
</template>

<script lang="ts" setup>
import { ref, Ref } from "vue";
import { database } from "../../assets/typescript/firebase";
import {
  ref as fbref,
  onChildAdded,
  push,
  set,
  DatabaseReference,
  DataSnapshot,
} from "firebase/database";
import ChatScreen from "./ChatScreen/ChatScreen.vue";
import ChatList from "./ChatList/ChatList.vue";
import SettingsMenu from "./Menus/SettingsMenu.vue";
import Modal from "../modal/Modal.vue";

interface Props {
  // todo: fix this lol.
  userData: any;
}

const props = defineProps<Props>();

const chats: any[] = [];
const settings_open = ref(false);
const selected_chat = ref("");

function toggleModal(selector: string) {
  console.log("Toggled modal");
  console.log(selector);
}

const friendsMenu: Ref<boolean> = ref(false);
function hideFriendsMenu(): void {
  friendsMenu.value = false;
}

function changeChat(id: string): void {
  selected_chat.value = id;
}

function reloadLocation(): void {
  location.reload();
}

function dismissSettings(e: Event): void {
  if (e.target === document.querySelector(".settings_icon")) return;
  settings_open.value = false;
}

getChats();

function getChats() {
  //Commented stuff below just adds chat to user, pls dont uncomment
  // let newChatPush = push(fbref(database, `Users/${props.userData.id}/Chats`));
  // set(newChatPush, {
  //   id: "-NACSuF0Udj7dUHacsGW",
  // });
  const userChatsRef: DatabaseReference = fbref(
    database,
    `Users/${props.userData.id}/Chats`,
  );
  onChildAdded(userChatsRef, (data: DataSnapshot) => {
    // console.log(data.val().id);
    chats.push({
      id: data.val().id,
      order: data.val().order,
    });
  });
}

function toggleSettings(): void {
  settings_open.value = !settings_open.value;
  console.log(`Toggled settings ${settings_open.value}`);
}

// const userData = props.userData;

// const userData = ref(JSON.parse(JSON.stringify(props.userData)).userData);

//DO NOTE DELETE (FOR NOW)
// onMounted(() => {
//   console.log("Mounted");
//   console.log(props.userData);
// });

const message_input = ref("");
function sendMessage(): void {
  console.log(message_input.value);
  message_input.value = "";
}
</script>

<style>
.main_wrapper {
  background-color: var(--d-gray);
  width: 100vw;
  display: grid;
  grid-template-columns: 250px 1fr;
  /* ^^^ Chat selector, Main Chat pannel  */
  grid-template-rows: 1fr;

  overflow: hidden;
}
</style>
