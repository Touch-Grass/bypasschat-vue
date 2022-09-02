<template>
  <div class="list_wrapper">
    <div class="upper_wrapper">
      <UserInfo
        :userData="props.userData"
        @toggleFriendsModal="toggleFriendsMenu"
      ></UserInfo>
      <div class="reverse">
        <img
          v-show="props.userData.id !== null"
          ref="settings_icon"
          class="mr-1 settings_icon"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAB/ElEQVRYhe2XO0sDQRSFv5jCIlj7iiAEFEQbbVXsI9hY2qfUQmNno+nyH+zzB7RRSEoVxVqxC8Qqxig+mrXIWXaS7E5210QRvDDM7JlzHzNz57HwL39UaoDTUWo/5Tzt49wtk1GNDcUIYEn1CZBQOe3oG2gAK6pvDOxa9WoMe74yDVwBB8CMsAWggjfdmwZ/08DL4iLdA9majhJAifa1vQXe1L4DtoGUwU8JuxPnTTqmjVJY52tSaADHQF3fn8Au9mUbEudTOnXZaOh7rZfzpBF5XtgwsAEshx2BuBvSRbbcmUzaFHN4o01beOvAGfACNNXOWvhpvFnJ2QKYBR7w1jrjwzki+Bw49OFn8HLjQT6sMgpcSOERbxdAa+QO8E5rrcdV9oQ5tM/EjGw4sjnay7krKaAqxTkDPxe266PjrvOZgc0Jq9K+a0LJk5RHDKwpbMyHP6a+ZwMbEfYU5CTqSeioTvj0JTs4QbxQAaSAV7WnDPxS9ZaPjotdGZi7k16JsAS2JMziJWEemFDZBz7oTsIMEZMwzDY8ZIDbMOxBlKWV7U36fBD9+lEM9stoj96XUZ5vXEau2K7je2CH7ut4R33fvo4h+EFSNgzaHiTzwmM/SGxSlKOCgRWEFaMai/MmrKheNDD3MVqOYS+yTBJ8Dkz8RADwyz8m/9JX+QLRONJ+SbNmWgAAAABJRU5ErkJggg=="
          @click="toggleSettings"
        />
      </div>
      <!-- <button @click="addChat" class="bg-blue-500">+</button> -->
    </div>

    <!-- <div class="block mt-1 h-line"></div> -->
    <div class="lower_wrapper">
      <div class="chat_select_wrapper">
        <div v-for="chat in props.chats" :style="{ order: chat.order }">
          <ChatSelect
            :chat_id="chat.id"
            @selectedChat="changeChat"
          ></ChatSelect>
        </div>
      </div>
    </div>
    <!-- <div class="button_logout_wrapper">
      <button class="bg-blue-800 button_logout" @click="logout">Logout</button>
    </div> -->
  </div>

  <Modal :showModal="friendsMenu" @toggleFriendsModal="toggleFriendsMenu">
    Whats up modal makers!!
  </Modal>
  <!-- <Modal @toggledVisible="hideFriendsMenu" :showModal="friendsMenu"
    >This is a cool modal!</Modal
  > -->
</template>

<script lang="ts" setup>
import { Ref, ref } from "vue";
import ChatSelect from "./ChatSelect.vue";
import UserInfo from "./UserInfo.vue";
import Modal from "../../modal/Modal.vue";
import { auth, database } from "../../../assets/typescript/firebase";
import { ref as fbref, push, set, ThenableReference } from "firebase/database";
const chatInfo: string[] = ["123", "132"];

interface Props {
  userData: any;
  chats: any[];
}

interface Emits {
  (e: "selectedChat", id: string): void;
  (e: "toggleSettings"): void;
  (e: "toggleModal", selector: string): void;
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();
const settings_icon = ref();

const friendsMenu: Ref<boolean> = ref(false);
function hideFriendsMenu(): void {
  friendsMenu.value = false;
}

function toggleFriendsMenu() {
  console.log("Toggling friends menu on emit");
  friendsMenu.value = !friendsMenu.value;
}

chatInfo.push("231");

function addChat(): void {
  let newChatPush: ThenableReference = push(fbref(database, "/Chats"));
  set(newChatPush, {
    name: "New Chat",
  });

  let userChatPush: ThenableReference = push(
    fbref(database, `/Users/${props.userData.id}/Chats`),
  );
  set(userChatPush, {
    id: newChatPush.key,
    order: 0,
  });
}

function changeChat(id: string): void {
  console.log(`Changed the chat to ${id}`);
  emits("selectedChat", id);
}

function toggleSettings(): void {
  emits("toggleSettings");
}

// // let userData: any = useUserData(props.userData);
// let userData = props.userData;

// console.group("userData values");
// // console.log(useUserData(props.userData));
// console.log(userData);
// console.groupEnd();

// watch(props.userData, (newVal: object) => {
//   console.log("Something changed");
//   if (newVal) {
//     userData = useUserData(props.userData);
//   }
//   // if (newVal) {
//   //   console.log("Something changed");
//   //   // console.log("Watched and found userData update!");
//   //   // console.log(newVal);
//   //   // console.log(JSON.parse(JSON.stringify(newVal)).userData.name);
//   // }
// });
// const userData: any = useUserData(props.userData);
// console.log(userData);
// const userData = JSON.parse(JSON.stringify(props.userData)).userData;
// const userData = props.userData;

// console.group("userData");
// console.log(userData);
// console.groupEnd();
</script>

<style scoped>
.list_wrapper {
  background-color: var(--d-gray);
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.upper_wrapper {
  width: 100%;
  height: 60px;
  border-bottom: 2px solid var(--d-dark-gray);
  /* .upper_wrapper { */
  display: flex;
  align-items: center;
  flex-direction: row;
}

.lower_wrapper {
  position: absolute;
  top: 60px;
  width: 100%;
  height: calc(100% - 60px);
  overflow: hidden;
}
.chat_select_wrapper {
  height: 100%;

  overflow-y: auto;

  padding: 5px;

  display: flex;
  flex-flow: column;
}

.chat_select_wrapper > div {
  list-style: none;

  width: 100%;
  height: 60px;
  margin-bottom: 10px;
}
</style>

<style>
.chat_selector {
  position: sticky;
  top: 0;
  height: 100vh;
  box-sizing: border-box;
}

.profile_image {
  width: 40px;
  height: 40px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  margin-left: 0.65rem;
  border: 1px solid white;
}

/* .list_wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
} */
/* .list_wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--d-gray);
} */
.upper_wrapper .reverse {
  display: flex;
  width: 100%;
  justify-content: flex-end !important;
  align-items: flex-end !important;
}

/* .list_wrapper > ul {
  display: inline-block;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
} */
.h-line {
  width: 100%;
  height: 1px;
  background-color: white;
  box-shadow: 0px 0px 5px 0px rgb(255, 255, 255);
}

.button_logout {
  margin: 2rem !important;
}
</style>
