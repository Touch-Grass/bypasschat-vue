<template>
  <!-- <div class="bg-red-600 messages_wrapper">
    <div class="bg-green-500 message_left_side">
      <div class="message left_message">
        <div class="message_bubble">
          <div class="message_info">
            <div class="message_info_name">wtfjs.com</div>
            <div class="message_info_time">12:69</div>
          </div>
          <div class="message_text">Cubby</div>
        </div>
      </div>

       <div class="message left_message">
        <div class="message_bubble">
          <div class="message_info">
            <div class="message_info_name">loljs</div>
            <div class="message_info_time">69:00</div>
          </div>
          <div class="message-text">index.html.js</div>
        </div>
      </div> -->
  <!-- </div>
    <div class="bg-red-500"></div>
    <div class="bg-blue-800 message_right_side">
      <div class="message right_message">
        <div class="message_bubble">
          <div class="message_info">
            <div class="message_info_name">
              fdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfd
            </div>
            <div class="message_info_time">69:00</div>
          </div>
          <div class="message-text">index.html.js</div>
        </div>
      </div>
    </div>
  </div> -->

  <!-- <div class="bg-gray-900 message_input_wrapper">
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
    </div> -->
  <!-- <Message text="text" time="20:20" sender="hi" image="lol"></Message> -->
  <Message chat_id="asdasdasd" msg_id="difojaosdj"></Message>
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
