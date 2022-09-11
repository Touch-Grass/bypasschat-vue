<template>
  <div class="message" ref="messageHTML" :class="message.side">
    <img :src="message.image" class="msg-img" />
    <div class="msg-bubble">
      <div class="msg-info">
        <div class="msg-info-name">{{ message.name }}</div>
        <div class="msg-info-time">{{ message.time }}</div>
      </div>
      <div class="msg-text">{{ message.text }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import {
  ref as fbref,
  onValue,
  onChildRemoved,
  DatabaseReference,
  DataSnapshot,
} from 'firebase/database';
import { database } from '../../../assets/typescript/firebase';
import { formatTime } from '../../../assets/typescript/time';
import { MessageData } from '../../../assets/typescript/types';

interface Props {
  chat_id: string;
  msg_id: string;
  msg_index: number;
  user_id: string;
}
const props = defineProps<Props>();

const message: MessageData = ref({
  text: '',
  date: '',
  time: '',
  name: '',
  image: '',
  sender: '',
  side: '',
});

const messageHTML = ref();

let index = 5;

function initReading() {
  const observer = new IntersectionObserver(
    entries => {
      if (props.msg_index >= index) {
        console.log(`Message Index: ${props.msg_index} Index: ${index}`);
        if (entries[0].isIntersecting) {
          console.log('Message has become visible!');
          messageHTML.value.style.border = '5px solid red';
          index++;
        }
      }
    },
    { threshold: [0.1] }
  );

  observer.observe(messageHTML.value);
}

function initMessage(
  msg_id: string = props.msg_id,
  chat_id: string = props.chat_id
): void {
  // initReading();

  const messageRef: DatabaseReference = fbref(
    database,
    `Chats/${chat_id}/Messages/${msg_id}`
  ); //Gets the ref or the specific message based of chat id and message id
  //   console.log(messageRef);
  onValue(messageRef, (snapshot: DataSnapshot) => {
    //On value event liddstener for the message ref, will update if message is edited at all
    const data = snapshot.val();
    if (data) {
      message.value.text = data.text;
      message.value.date = data.time;
      message.value.sender = data.sender;
      updateTime();
      // Sets the side that the message will be on.
      message.value.side =
        props.user_id === message.value.sender
          ? 'right-message'
          : 'left-message';
      const userRef: DatabaseReference = fbref(
        database,
        `Users/${data.sender}`
      ); //Ref to the user who sent the message
      // Listens for changes in the database and will run here.
      onValue(userRef, snapshot => {
        const data = snapshot.val();
        if (data) {
          message.value.name = data.name;
          message.value.image = data.image;
        }
      });
    }
  });
  onChildRemoved(messageRef, () => {
    console.log('Message Removed');
    //delete this vue component
  });
  //Updates the time every minute.
  setInterval(() => updateTime(), 60000);
}

function updateTime(): void {
  if (message.value.date) message.value.time = formatTime(message.value.date);
}

onMounted(() => {
  messageHTML.value.scrollIntoView({ behavior: 'smooth' });
  initMessage();
});
</script>

<style scoped>
.message {
  /*   Each message has this class */
  display: flex;
  align-items: flex-end;
  /* margin-bottom: 10px; */
}
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

.msg-img {
  /*   Image for each message */
  isolation: isolate;
  z-index: 10 !important;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  background: #ddd;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  user-select: none;
}

.msg-bubble {
  max-width: 450px;
  white-space: initial;
  padding: 15px;
  border-radius: 15px;
  background: var(--left-msg-bg);
  box-shadow: 0px 0px 8px var(--msg-glow) var(--left-msg-bg);
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
  box-shadow: 0px 0px 8px var(--msg-glow) var(--right-msg-bg);
  color: #fff;
  border-bottom-right-radius: 0;
}
.right-message .msg-img {
  margin: 0 0 0 10px;
}
</style>
