<template>
  <div class="chat_wrapper bg-gray-800">
    <div class="chat_head">{{ props.chat_id }}</div>

    <div class="message_wrapper" v-for="id in messages">
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
          class="text-gray-800"
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
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
  user_id: string;
  chat_id: any;
}

const props = defineProps<Props>();

const message_input = ref("");

const messages: Ref<any[]> = ref([]);

onMounted(() => {
  loadMessages();
});

function loadMessages() {
  const messagesRef = fbref(database, `/Chats/${props.chat_id}/Messages`);
  onChildAdded(messagesRef, (data) => {
    messages.value.push(data.key);
    document.querySelector(".message_wrapper")?.scrollTo(0, 999999999999999);
    // console.log(message_wrapper.value);
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

function getTime() {
  /* To pick timezone: https://github.com/omsrivastava/timezones-list/blob/master/dist/timezones.json */
  const currentDate = dayjs().utc().format("YYYY-MM-DD/hh:mm:ss/a"); //Gets the time from day js in format YYYY-MM-DD/hh:mm:ss/a, ex: 2021-09-01/09:16:45/pm
  return currentDate;
}
</script>

<style scoped>
.chat_wrapper {
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .chat_head {
    width: calc(100% - 155px);
  }
}

.chat_head {
  position: absolute;
  top: 0;
  width: calc(100% - 250px);
  height: 30px;
  background-color: rgba(0, 0, 255, 0.5);
  backdrop-filter: blur(15px);
}
</style>
