<template>
  <div class="chat_wrapper">
    <div class="chat_head shadow-lg">
      <p>
        {{ props.chat_id }}
      </p>
    </div>

    <div class="chat_messages_area">
      <ul class="chat_messages_wrapper" ref="chat_messages_wrapper">
        <li v-for="id in messages">
          <Message
            :chat_id="props.chat_id"
            :msg_id="id"
            :user_id="props.user_id"
          ></Message>
        </li>
      </ul>
    </div>

    <div class="bg-gray-900 message_input_wrapper">
      <form @submit.prevent="sendMessage" method="post">
        <div class="message_input_container">
          <input
            v-model="message_input"
            required
            oninvalid="this.setCustomValidity('Please enter a message')"
            class="message_input_box"
            placeholder="Message"
            type="text"
          />
        </div>
        <div class="message_button_container">
          <button class="button_submit" type="submit">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABkklEQVRIie3VvWsUQRgH4CeJ4BGipLGTFBZ+YJtaQtoYjCD+ARFSxsrGKgSElLFPoyBY2OVIa0CFBLFUuKRKqqBFTGwOP+4sZhc2w+3u3XoXguQHb3Pv3Dy7s7OznOc/yAim8Bx7eDdIrIa7WMM3tDO1129sFLN4iaMIy9ZqP7AreIQ6mjlQK+pNVcUmsIB1/MzB0vqBVwneFpb9Qi/YNTzG+8wkZbWLB04u+1o32G0s4XOXULY2kpX5Ev0+U4ZuVsDS57ksLGc96h0Lu70wHyqgR5hL/r/cof+6DJVc2Yse0B3h0cA9nffBw27gNAvKd24d48n4G/jeYUwTl3uB4Q4OOkzWwgqGk3GX5G/E9V7RNFexnZnoGPcz/SG8yUHbmK8Kw0XhPWzgVtRbKkB/CyfcPyd+JWbxpwDe7Aca5zoOC9A2FvuN1pSfai3hBMvNcFEzJ01slYz5hP0Kc5emho/y7/jpINA0E/iaA98cJAzT+BWhjUGjaZ5E8LPTgoeEL1AKT54WDGPCJ/VtciHnOTv5C+oR7Pjc+gqDAAAAAElFTkSuQmCC"
            />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref, onMounted } from "vue";
import Message from "./Message.vue";
import { database } from "../../../assets/typescript/firebase";
import {
  ref as fbref,
  push,
  set,
  onChildAdded,
  DataSnapshot,
} from "firebase/database";
import { getTime } from "../../../assets/typescript/time";

interface Props {
  chat_id: string;
  user_id: string;
}
const props = defineProps<Props>();

/**
 * Array of all messages in chat, each item is an id of a message as a string,
 * ex: "-J1iKLLAVBB29B2"
 */
const messages: Ref<string[]> = ref([]);
const chat_users: Ref<string[]> = ref([]);
const message_input = ref("");
const chat_messages_wrapper = ref();

const chat = {
  name: ref(""),
  type: ref(""),
};

onMounted(() => loadMessages());

/**
 * Loads all messages in chat from firebase
 */
function loadMessages(): void {
  const messagesRef = fbref(database, `/Chats/${props.chat_id}/Messages`);
  onChildAdded(messagesRef, (data: DataSnapshot) => {
    if (data.key) {
      messages.value.push(data.key);
    }

    // document.querySelector(".chat_messages_wrapper")?.scrollTo(0, 999999999999999);
    // console.log(chat_messages_wrapper.value);
  });
}

function getMessage() {
  return {
    sender: props.user_id,
    text: message_input.value,
    time: getTime(),
  };
}

/**
 * Sends a message to the chat
 * Calls getMessage() to get the message info about what is sent.
 */
function sendMessage(): void {
  //Calls getMessage function which returns message object
  const message = getMessage();
  console.log(message);

  const messageRef = push(fbref(database, `/Chats/${props.chat_id}/Messages`));
  set(messageRef, message);

  // Clears the input.
  message_input.value = "";
}
</script>

<style scoped>
.chat_wrapper {
  background-color: var(--d-light-gray);

  width: 100%;
  height: 100%;
}
</style>


<style scoped> /* Chat header */
.chat_head {
  background-color: var(--d-light-gray);
  border-bottom: 1px solid var(--d-gray);
  position: absolute;
  top: 0;
  width: calc(100% - 250px);
  height: 30px;
  backdrop-filter: blur(10px);

}
.chat_head p {
  text-align: center;
}
</style>

<style scoped> /* Chat message area */
.chat_messages_area {
  position: absolute;
  top: 30px;
  width: calc(100% - 250px);
  height: calc(100% - 90px);
  /* This is a backup to keep the chat fixed and not scroll with messages */
  overflow: hidden;
}

.chat_messages_wrapper {
  height: 100%;
  padding: 5px 5px;

  /* Overflow y in this container makes it so only the message wrapper scrolls and the whole chat stays fixed */
  overflow-y: scroll;
}

.chat_messages_wrapper > li {
  list-style: none;

  /* The height controls the spacing between messages */
  height: 100px; 
}
</style>

<style scoped> /* Chat message input */
.message_input_wrapper {
  background-color: transparent;
  height: 80px;

  /* Positioning wrapper at bottom right */
  position: absolute;
  bottom: 0;
  right: 0;
  width: calc(100% - 250px);
}

.message_input_wrapper form {
  /* Styling the forms appearance */
  background-color: var(--d-tint-gray);
  border-radius: 15px;

  margin: 10px;
  height: calc(100% - 20px);
  width: calc(100% - 20px);

  /* Grid to hold the inner input and buttons */
  display: grid;
  /* Grid, picure it as input button padding, to add another button just add another 50px to the list below, ex: 1fr (input) 50px (button1) 50px (button2) 5px (padding)*/
  grid-template-columns: 1fr 50px 5px;
  grid-template-rows: 1fr;
}

.message_input_container,
.message_button_container {
  background-color: transparent;
  width: 100%;
  height: 60px;
}
.message_input_container {
}

.message_button_container {
  padding: 15px 5px;
}

.message_input_box {
  background-color: transparent;
  width: 100%;
  height: 100%;

  padding-left: 10px;
}

.message_input_box:focus {
  outline: none;
}

.button_submit {
  width: 30px;
  height: 30px;
  border: none;
  outline: none;
  transition: 200ms;
}

.button_submit:active {
  transform: scale(0.5);
}
</style>
