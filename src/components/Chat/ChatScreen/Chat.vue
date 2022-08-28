<template>
  <div class="chat_wrapper bg-gray-800">
    <div class="chat_head">
      <p>
        {{ props.chat_id }}
      </p>
    </div>

    <div
      class="chat_messages_wrapper"
      ref="chat_messages_wrapper"
      v-for="id in messages"
    >
      <Message
        :chat_id="props.chat_id"
        :msg_id="id"
        :user_id="props.user_id"
      ></Message>
    </div>

    <div class="bg-gray-900 message_input_wrapper">
      <form @submit.prevent="sendMessage" method="post">
        <input
          v-model="message_input"
          required
          oninvalid="this.setCustomValidity('Please enter a message')"
          class="message_input_box"
          placeholder="Message"
          type="text"
        />
        <button class="button_submit" type="submit">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABkklEQVRIie3VvWsUQRgH4CeJ4BGipLGTFBZ+YJtaQtoYjCD+ARFSxsrGKgSElLFPoyBY2OVIa0CFBLFUuKRKqqBFTGwOP+4sZhc2w+3u3XoXguQHb3Pv3Dy7s7OznOc/yAim8Bx7eDdIrIa7WMM3tDO1129sFLN4iaMIy9ZqP7AreIQ6mjlQK+pNVcUmsIB1/MzB0vqBVwneFpb9Qi/YNTzG+8wkZbWLB04u+1o32G0s4XOXULY2kpX5Ev0+U4ZuVsDS57ksLGc96h0Lu70wHyqgR5hL/r/cof+6DJVc2Yse0B3h0cA9nffBw27gNAvKd24d48n4G/jeYUwTl3uB4Q4OOkzWwgqGk3GX5G/E9V7RNFexnZnoGPcz/SG8yUHbmK8Kw0XhPWzgVtRbKkB/CyfcPyd+JWbxpwDe7Aca5zoOC9A2FvuN1pSfai3hBMvNcFEzJ01slYz5hP0Kc5emho/y7/jpINA0E/iaA98cJAzT+BWhjUGjaZ5E8LPTgoeEL1AKT54WDGPCJ/VtciHnOTv5C+oR7Pjc+gqDAAAAAElFTkSuQmCC"
          />
        </button>
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
  onValue,
  onChildAdded,
} from "firebase/database";
import { getTime } from "../../../assets/typescript/time";

interface Props {
  user_id: string;
  chat_id: any;
}

const props = defineProps<Props>();
const messages: Ref<any[]> = ref([]);

const message_input = ref("");
const chat_messages_wrapper = ref();

onMounted(() => {
  loadMessages();
});

function loadMessages() {
  const messagesRef = fbref(database, `/Chats/${props.chat_id}/Messages`);
  onChildAdded(messagesRef, (data) => {
    messages.value.push(data.key);

    // chat_messages_wrapper.value.scrollTop += 500;
    setTimeout(() => {
      // console.log(chat_messages_wrapper.value);
      // chat_messages_wrapper.value.display = "none";
    }, 500);
    // chat_messages_wrapper.value.style.display = "none";

    // document.querySelector(".chat_messages_wrapper")?.scrollTo(0, 999999999999999);
    // console.log(chat_messages_wrapper.value);
  });
}

function sendMessage() {
  //Calls getMessage function which returns message object
  const message = getMessage();

  console.log(message);

  const messageRef = push(fbref(database, `/Chats/${props.chat_id}/Messages`));
  set(messageRef, message);

  message_input.value = "";
}

function getMessage() {
  return {
    sender: props.user_id,
    text: message_input.value,
    time: getTime(),
  };
}
</script>

<style scoped>
.message_input_wrapper {
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  /* ^^^ Recenter after giving rest of chat padding */
}
.message_input_wrapper form {
  height: 100%;
  /* width: calc(100% - 250px); */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.message_input_box {
  color: white;
  /* font-weight: 600; */
  background-color: var(--d-gray);
  width: calc(100% - 10px);
  height: 50px;
  padding-left: 5px;
}

.button_submit {
  position: absolute;
  z-index: 100;
  right: 0;
  bottom: 0;

  aspect-ratio: 1/1;
  padding: 3px 3px 3px 1px;
  transform: translate(-270px, -12px);
}
</style>

<style>
/* .chat_wrapper {
  padding: 10px;
} */
</style>

<!-- <style scoped>
.chat_wrapper {
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .chat_head {
    width: calc(100% - 155px);
  }
}

</style> -->
<style>
.chat_head {
  position: fixed;
  top: 0;
  width: calc(100% - 250px);
  height: 30px;
  background-color: rgba(47, 49, 54, 0.9);
  backdrop-filter: blur(10px);
}
.chat_head p {
  text-align: center;
}
</style>
