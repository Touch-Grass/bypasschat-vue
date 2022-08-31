<template>
  <div class="message" :class="message.side.value">
    <img :src="message.image.value" class="msg-img" />
    <div class="msg-bubble">
      <div class="msg-info">
        <div class="msg-info-name">{{ message.name.value }}</div>
        <div class="msg-info-time">{{ message.time.value }}</div>
      </div>
      <div class="msg-text">{{ message.text.value }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref } from "vue";
// import { Stringish, database, ref, onValue } from "../../main";
import { Stringish } from "../../../main";
import {
  getDatabase,
  ref as fbref,
  onValue,
  onChildRemoved,
  DatabaseReference,
  Database,
  DataSnapshot,
} from "firebase/database";
import { database } from "../../../assets/typescript/firebase";
import { formatTime } from "../../../assets/typescript/time";

interface Props {
  chat_id: string;
  msg_id: string;
  user_id: string;
}
const props = defineProps<Props>();

type MessageData = {
  text: Ref<string>;
  date: Ref<string>;
  time: Ref<string>;
  name: Ref<string>;
  image: Ref<string>;
  sender: Ref<string>;
  side: Ref<string>;
};

const message: MessageData = {
  text: ref(""),
  date: ref(""),
  time: ref(""),
  name: ref(""),
  image: ref(""),
  sender: ref(""),
  side: ref(""),
};

initMessage();

function initMessage(
  msg_id: string = props.msg_id,
  chat_id: string = props.chat_id,
): void {
  const messageRef: DatabaseReference = fbref(
    database,
    `Chats/${chat_id}/Messages/${msg_id}`,
  ); //Gets the ref or the specific message based of chat id and message id
  //   console.log(messageRef);
  onValue(messageRef, (snapshot: DataSnapshot) => {
    //On value event liddstener for the message ref, will update if message is edited at all
    const data = snapshot.val();
    if (data) {
      message.text.value = data.text;
      message.date.value = data.time;
      message.sender.value = data.sender;
      updateTime();
      // Sets the side that the message will be on.
      message.side.value =
        props.user_id === message.sender.value
          ? "right-message"
          : "left-message";
      const userRef: DatabaseReference = fbref(
        database,
        `Users/${data.sender}`,
      ); //Ref to the user who sent the message
      // Listens for changes in the database and will run here.
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          message.name.value = data.name;
          message.image.value = data.image;
        }
      });
    }
  });
  onChildRemoved(messageRef, () => {
    console.log("Message Removed");
    //delete this vue component
  });
  //Updates the time every minute.
  setInterval(() => updateTime(), 60000);
}

function updateTime(): void {
  if (message.date.value) {
    message.time.value = formatTime(message.date.value);
  }
}
</script>

<style scoped>
.msg-text {
  max-width: 400px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  text-align: start;
  color: black;
  font-weight: 500;
}

.right-message .msg-text {
  color: white;
}

.msg-info-time {
  color: darkslategray;
}
.main-chat {
  /*   The area of the chat where the messenges are */
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.message {
  /*   Each message has this class */
  display: flex;
  align-items: flex-end;
  /* margin-bottom: 10px; */
}

.msg-img {
  /*   Image for each message */
  width: 50px;
  height: 50px;
  margin-right: 10px;
  background: #ddd;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
}

.msg-bubble {
  max-width: 450px;
  white-space: initial;
  padding: 15px;
  border-radius: 15px;
  background: var(--left-msg-bg);
}

.msg-info {
  /*   Wrapper around message info (name & time) */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.msg-info-name {
  margin-right: 10px;
  font-weight: bold;
}
.msg-info-time {
  font-size: 0.85em;
}

.left-message .msg-bubble {
  border-bottom-left-radius: 0;
}

.right-message {
  flex-direction: row-reverse;
}
.right-message .msg-bubble {
  background: var(--right-msg-bg);
  color: #fff;
  border-bottom-right-radius: 0;
}
.right-message .msg-img {
  margin: 0 0 0 10px;
}
</style>
