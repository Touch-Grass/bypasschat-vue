<template>
  <div class="list_wrapper">
    <div class="upper_wrapper">
      <div class="user_wrapper">
        <img
          :src="props.userData.image ?? defaultImage"
          alt="Profile Image"
          class="profile_image"
        />
        <h1 class="block profile_name">{{ props.userData.name ?? "Error" }}</h1>
      </div>
      <!-- <div class="reverse">
        <img
          v-show="props.userData.id !== null"
          ref="settings_icon"
          class="mr-1 settings_icon"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAB/ElEQVRYhe2XO0sDQRSFv5jCIlj7iiAEFEQbbVXsI9hY2qfUQmNno+nyH+zzB7RRSEoVxVqxC8Qqxig+mrXIWXaS7E5210QRvDDM7JlzHzNz57HwL39UaoDTUWo/5Tzt49wtk1GNDcUIYEn1CZBQOe3oG2gAK6pvDOxa9WoMe74yDVwBB8CMsAWggjfdmwZ/08DL4iLdA9majhJAifa1vQXe1L4DtoGUwU8JuxPnTTqmjVJY52tSaADHQF3fn8Au9mUbEudTOnXZaOh7rZfzpBF5XtgwsAEshx2BuBvSRbbcmUzaFHN4o01beOvAGfACNNXOWvhpvFnJ2QKYBR7w1jrjwzki+Bw49OFn8HLjQT6sMgpcSOERbxdAa+QO8E5rrcdV9oQ5tM/EjGw4sjnay7krKaAqxTkDPxe266PjrvOZgc0Jq9K+a0LJk5RHDKwpbMyHP6a+ZwMbEfYU5CTqSeioTvj0JTs4QbxQAaSAV7WnDPxS9ZaPjotdGZi7k16JsAS2JMziJWEemFDZBz7oTsIMEZMwzDY8ZIDbMOxBlKWV7U36fBD9+lEM9stoj96XUZ5vXEau2K7je2CH7ut4R33fvo4h+EFSNgzaHiTzwmM/SGxSlKOCgRWEFaMai/MmrKheNDD3MVqOYS+yTBJ8Dkz8RADwyz8m/9JX+QLRONJ+SbNmWgAAAABJRU5ErkJggg=="
          @click="toggleSettings"
        />
      </div>
      <button @click="addChat" class="bg-blue-500">+</button> -->
    </div>

    <!-- <div class="block mt-1 h-line"></div> -->
    <div class="lower_wrapper">
      <div class="chat_select_wrapper">
        <li v-for="id in props.chats">
          <ChatSelect :chat_id="id" @selectedChat="changeChat"></ChatSelect>
        </li>
      </div>
    </div>
    <!-- <div class="button_logout_wrapper">
      <button class="bg-blue-800 button_logout" @click="logout">Logout</button>
    </div> -->
  </div>

  <ul>
    <li>
      <div class="hi"></div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ChatSelect from "./ChatSelect.vue";
import { useUserData } from "../../Composables/composables";
import { auth, database } from "../../../assets/typescript/firebase";
import { ref as fbref, push, set, ThenableReference } from "firebase/database";
import { VoidTypeAnnotation } from "@babel/types";
const chatInfo: string[] = ["123", "132"];
const defaultImage =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png";

interface Props {
  userData: any;
  chats: string[];
}

interface Emits {
  (e: "selectedChat", id: string): void;
  (e: "toggleSettings"): void;
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();
const settings_icon = ref();

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
  });
}

function changeChat(id: string): void {
  console.log(`Changed the chat to ${id}`);
  emits("selectedChat", id);
}

function toggleSettings(): void {
  emits("toggleSettings");
}

function logout(): void {
  auth.signOut();
  location.reload();
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
  border-bottom: 1px solid var(--d-dark-gray);


}

.lower_wrapper {
  position: absolute;
  top: 60px;
  width: 100%;
  height: calc(100% - 60px);
  overflow: hidden;
}
</style>

<style scoped>
.chat_select_wrapper {
  height: 100%;

  overflow-y: auto;

  padding: 5px;
}

.chat_select_wrapper > li {
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
  width: 50px;
  height: 50px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  margin-left: 0.65rem;
  border: 1px solid white;
}

.user_wrapper {
  display: flex;
  align-items: center;
  flex: 0 0 max-content;
  padding-right: 5px;
  width: 100%;
  height: 100%;
}

.user_wrapper:hover {
  background-color: var(--d-light-gray);
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
/* .upper_wrapper {
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 70px;
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

.profile_image,
.settings_icon,
.profile_name {
  /* Todo: Limit the length of the name */
  user-select: none;
}
.profile_name {
  text-align: start;
  margin-left: 10px;
  font-size: 1.5rem;
}

.button_logout {
  margin: 2rem !important;
}
</style>
