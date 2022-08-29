<template>
  <div @click="dismissSettings($event)" class="main_wrapper">
    <div v-if="props.userData.id === null" class="not_logged_in">
      <h1>Error, you are not logged in!</h1>
      <p>
        Click <a href="#" @click="reloadLocation">here</a> to try to reload the
        page
      </p>
    </div>

    <div v-if="props.userData.id !== null" class="chat_selector shadow-2xl">
      <ChatList
        :userData="props.userData"
        :chats="chats"
        @selectedChat="changeChat"
        @toggleSettings="toggleSettings"
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
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { database } from "../../assets/typescript/firebase";
import {
  ref as fbref,
  onChildAdded,
  push,
  set,
  DatabaseReference,
  DataSnapshot,
} from "firebase/database";
import { useUserData } from "../Composables/composables";
import ChatScreen from "./ChatScreen/ChatScreen.vue";
import ChatList from "./ChatList/ChatList.vue";
import SettingsMenu from "./Menus/SettingsMenu.vue";

interface Props {
  // todo: fix this lol.
  userData: any;
}

const props = defineProps<Props>();

const chats: string[] = [];
const settings_open = ref(false);
const selected_chat = ref("");

function changeChat(id: string) {
  selected_chat.value = id;
}

function reloadLocation() {
  location.reload();
}

function dismissSettings(e: Event) {
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
    chats.push(data.val().id);
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

<!-- <style>
@media (max-width: 640px) {
  .message_input_wrapper {
    width: calc(100% - 155px) !important;
  }
  .profile_name {
    font-size: 1rem;
    margin-left: 5px;
  }
  .profile_image {
    width: 40px;
    height: 40px;
    margin-left: 3px;
  }
}

</style> -->

<!-- <style>
.not_logged_in {
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (max-width: 640px) {
  .message_input_wrapper {
    width: calc(100% - 155px) !important;
  }
  .main_wrapper {
    grid-template-columns: 155px 1fr;
    grid-template-rows: 1fr 90px;
  }
}

.sidebar_selector,
.chat_selector {
  height: 100vh;
  max-height: 100vh;
}

.chat_area {
  height: 100%;
  width: 100%;
  overflow-y: auto;
}
</style> -->
