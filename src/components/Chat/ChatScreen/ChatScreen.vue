<template>
  <!-- <Message text="text" time="20:20" sender="hi" image="lol"></Message> -->
  <Message chat_id="asdasdasd" msg_id="difojaosdj"></Message>

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
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Message from "./Message.vue";

const message_input = ref("");

function sendMessage() {
  console.log(message_input.value);
  message_input.value = "";
}
</script>
