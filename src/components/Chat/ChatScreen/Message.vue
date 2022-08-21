<template>
  <div class="message">
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
import { onMounted } from "vue";
// import { Stringish, database, ref, onValue } from "../../main";
import { Stringish } from "../../../main";
import { getDatabase, ref, onValue } from "firebase/database";
import { database } from "../../../assets/typescript/firebase";

interface Props {
  chat_id: Stringish;
  msg_id: Stringish;
}
const props = defineProps<Props>();

const message = {
  text: "",
  time: "",
  name: "",
  image: "",
  sender: "",
};

function initMessage(
  msg_id: Stringish = props.msg_id,
  chat_id: Stringish = props.chat_id,
) {
  const messageRef = ref(database, `Chats/${chat_id}/Messages/${msg_id}`); //Gets the ref or the specific message based of chat id and message id
  //   console.log(messageRef);
  onValue(messageRef, (snapshot) => {
    //On value event listener for the message ref, will update if message is edited at all
    const data = snapshot.val();
    // console.log(data);
    if (data) {
      message.text = data.text;
      message.time = data.time;
      message.sender = data.sender;
      const userRef = ref(database, `Users/${data.sender}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data) {
          message.name = data.name;
          message.image = data.image;
        }
      });
    }
  });
}

onMounted(() => {
  //  initMessage();
});
</script>

<style scoped>
:root {
  --msger-bg: #fff;
  --left-msg-bg: #ececec;
  --right-msg-bg: #579ffb;
}

*,
*:before,
*:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.msg-text {
  text-align: start;
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
  margin-bottom: 10px;
}

.message:last-of-type {
  margin: 0;
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
