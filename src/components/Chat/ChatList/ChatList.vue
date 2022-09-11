<template>
  <div class="list_wrapper" @contextmenu="(e: Event) => {e.preventDefault()}">
    <div class="upper_wrapper">
      <UserInfo
        :userData="props.userData"
        @toggleModal="(selector, mode) => emits('toggleModal', selector, mode)"
      ></UserInfo>
      <div class="reverse">
        <img
          @click="
            () => {
              emits('toggleModal', 'newChat', true);
            }
          "
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAdElEQVRIiWNgGAUkAg8GBobHDAwM/8nEj6Bm4ASPKDAc2RKcAKaIXIChn4kCw4gCpFpAsg8HnQ8GnwUsBORxhTe6OCMuAwbcB+gu+49DHCcY+pE84HGADogOexigexA9htLkFtXIZmAFHgyU1QkEK5xRgAEAw+tLFxSOpJUAAAAASUVORK5CYII="
          class="new_chat_button"
        />
        <img
          v-show="props.userData.id !== null"
          ref="settings_icon"
          class="mr-1 settings_icon"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAB/ElEQVRYhe2XO0sDQRSFv5jCIlj7iiAEFEQbbVXsI9hY2qfUQmNno+nyH+zzB7RRSEoVxVqxC8Qqxig+mrXIWXaS7E5210QRvDDM7JlzHzNz57HwL39UaoDTUWo/5Tzt49wtk1GNDcUIYEn1CZBQOe3oG2gAK6pvDOxa9WoMe74yDVwBB8CMsAWggjfdmwZ/08DL4iLdA9majhJAifa1vQXe1L4DtoGUwU8JuxPnTTqmjVJY52tSaADHQF3fn8Au9mUbEudTOnXZaOh7rZfzpBF5XtgwsAEshx2BuBvSRbbcmUzaFHN4o01beOvAGfACNNXOWvhpvFnJ2QKYBR7w1jrjwzki+Bw49OFn8HLjQT6sMgpcSOERbxdAa+QO8E5rrcdV9oQ5tM/EjGw4sjnay7krKaAqxTkDPxe266PjrvOZgc0Jq9K+a0LJk5RHDKwpbMyHP6a+ZwMbEfYU5CTqSeioTvj0JTs4QbxQAaSAV7WnDPxS9ZaPjotdGZi7k16JsAS2JMziJWEemFDZBz7oTsIMEZMwzDY8ZIDbMOxBlKWV7U36fBD9+lEM9stoj96XUZ5vXEau2K7je2CH7ut4R33fvo4h+EFSNgzaHiTzwmM/SGxSlKOCgRWEFaMai/MmrKheNDD3MVqOYS+yTBJ8Dkz8RADwyz8m/9JX+QLRONJ+SbNmWgAAAABJRU5ErkJggg=="
          @click="
            () => {
              emits('toggleModal', 'settings', true);
            }
          "
        />
      </div>
      <!-- <button @click="addChat" class="bg-blue-500">+</button> -->
    </div>

    <!-- <div class="block mt-1 h-line"></div> -->
    <div class="lower_wrapper">
      <div class="chat_select_wrapper">
        <div v-for="chat in props.chats">
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

  <!-- <Modal :showModal="friendsMenu" @toggleFriendsModal="toggleFriendsMenu">
    Whats up modal makers!!
  </Modal> -->
  <!-- <Modal @toggledVisible="hideFriendsMenu" :showModal="friendsMenu"
    >This is a cool modal!</Modal
  > -->
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';
import ChatSelect from './ChatSelect.vue';
import UserInfo from './UserInfo.vue';
import { ChatsRef, ChatType, UserData } from '../../../assets/typescript/types';
const chatInfo: string[] = ['123', '132'];

/*Todo:

- add how many messages are read
- on login update how many unread messages
- when go in chat scroll to last read message
- when scrolled to bottom of chat, read all messages

*/

interface Props {
  userData: UserData;
  chats: ChatType;
}

interface Emits {
  (e: 'selectedChat', id: string): void;
  (e: 'toggleSettings'): void;
  (e: 'toggleModal', selector: string, mode: boolean): void;
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();
const settings_icon = ref();

const friendsMenu: Ref<boolean> = ref(false);
chatInfo.push('231');

const chatsRef: ChatsRef = ref(props.chats);

function changeChat(id: string): void {
  console.log(`Changed the chat to ${id}`);
  emits('selectedChat', id);

  // updateChats(id);
}

// initChats();
// function initChats() {
//   props.chats.forEach(chat => {
//     const chatRef = fbref(
//       database,
//       `Users/${props.userData.id}/Chats/${chat.id}`
//     );
//     onValue(chatRef, snapshot => {
//       if (snapshot.exists()) {
//         console.log(snapshot.val());
//         console.log("Chat exists");
//       } else {
//         console.log("Chat does not exist");
//         set(chatRef, {
//           id: chat.id,
//           name: chat.name,
//           lastMessage: "",
//           lastMessageTime: "",
//           lastMessageSender: "",
//         });
//       }
//     });
//   });
// }

// function updateChats(chat_id: string) {
//   console.log("Updating chat order");

//   const chatsRef = fbref(database, `Users/${props.userData.id}/Chats`);
//   set(child(chatsRef, `${chat_id}/order`), 1);
//   onValue(chatsRef, snapshot => {
//     if (snapshot.exists()) {
//       const arrangeChats: Record<string, number>[] = [];
//       snapshot.forEach((chat: any) => {
//         if (chat.key === chat_id) return;
//         // set(child(chatsRef, `${chat.key}/order`), orderCount);
//         arrangeChats.push({
//           id: chat.key,
//           order: chat.val().order,
//         });
//       });
//       arrangeChats.sort((a, b) => {
//         return a.order - b.order;
//       });
//       let orderCount: number = 2;
//       arrangeChats.forEach((chat: any) => {
//         set(child(chatsRef, `${chat.id}/order`), orderCount);
//         orderCount += 1;
//       });
//     }
//   });
// }
</script>

<style>
.settings_icon,
.user_wrapper,
.new_chat_button {
  cursor: pointer;
}
</style>

<style scoped>
.list_wrapper {
  background-color: var(--theme-main);
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.upper_wrapper {
  width: 100%;
  height: 60px;
  border-bottom: 2px solid var(--theme-dark);
  display: flex;
  align-items: center;
  flex-direction: row;
}

.new_chat_button {
  margin-bottom: 3.9px;
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

.upper_wrapper .reverse img {
  user-select: none;
}

.upper_wrapper .reverse {
  display: flex;
  width: 100%;
  justify-content: flex-end !important;
  align-items: flex-end !important;
}

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
