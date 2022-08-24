<template>
  <!-- <Message text="text" time="20:20" sender="hi" image="lol"></Message> -->
  <!-- <Message chat_id="asdasdasd" msg_id="difojaosdj"></Message> -->
  <div v-for="id in props.chats">
    <Chat :chat_id="id"></Chat>
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
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Message from "./Message.vue";
import Chat from "./Chat.vue";

interface Props {
  chats: string[];
}

const props = defineProps<Props>();

const message_input = ref("");

function sendMessage() {
  console.log(message_input.value);
  message_input.value = "";
}
</script>

<style>
.message_input_wrapper {
  position: fixed;
  bottom: 0;
  right: 0;
  height: 60px;
  width: calc(100% - 250px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style scoped>
.message_input_wrapper form {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.message_input_wrapper input {
  width: calc(100% - 80px);
  height: calc(100% - 20px);
  border-radius: 5px;
}

.button_submit {
  font-family: "JetBrains Mono", monospace;
  width: 4ch;
  height: calc(100% - 20px);
  border-radius: 5px;
  background-color: var(--d-gray);
  border: none;
  color: var(--d-gray);
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: none;
  margin-left: 5px;

  display: flex;
  place-items: center;
}

.button_submit img {
  display: flex;
}
</style>
