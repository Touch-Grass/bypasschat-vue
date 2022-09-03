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
        @toggleSettings="toggleSettings"
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
    <SettingsMenu v-show="settings_open" />
  </div>

  <ModalLayout
    :userData="props.userData"
    :modalData="modalData"
    @toggleModal="toggleModals"
  ></ModalLayout>
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
import ModalLayout from "../modal/ModalLayout.vue";

interface Props {
  // todo: fix this lol.
  userData: any;
}

const props = defineProps<Props>();

const chats: any[] = [];
const settings_open = ref(false);
const selected_chat = ref("");

// type TypeModalData = {
//   settings: boolean;
//   friends: boolean;
//   newChat: boolean;
// };

type TypeModalData = Ref<Record<string, boolean>>;

const modalData: TypeModalData = ref({
  settings: false,
  friends: false,
  profile: false,
  newChat: false,
});

function toggleModals(selector: string, mode: boolean): void {
  console.log(`Toggled the ${selector} modal to ${mode}`);
  if (selector === "all") {
    modalData.value.settings = mode;
    modalData.value.friends = mode;
    modalData.value.profile = mode;
    modalData.value.newChat = mode;
  } else {
    modalData.value[selector] = mode;
    console.log(modalData.value[selector]);
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
