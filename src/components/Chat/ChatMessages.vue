<template>
  <div class="bg-red-600 messages_wrapper">
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
      <!-- <div class="message left_message">
        <div class="message_bubble">
          <div class="message_info">
            <div class="message_info_name">loljs</div>
            <div class="message_info_time">69:00</div>
          </div>
          <div class="message-text">index.html.js</div>
        </div>
      </div> -->
    </div>
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
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const message_input = ref("");

function sendMessage() {
  console.log(message_input.value);
  message_input.value = "";
}
</script>

<style scoped>
.messages_wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 0.25fr 1fr;
  grid-template-rows: 1fr;
}
.message_left_side,
.message_right_side {
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-end;
}

.message_left_side {
  align-items: flex-start;
}
.message_right_side {
  align-items: flex-end;
}
.message {
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
}
.message:last-of-type {
  margin-bottom: 80px;
}

.message_img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  background: #ddd;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
}

.message_bubble {
  max-width: 350px;
  padding: 15px;
  border-radius: 15px;
  background: var(--left-msg-bg);
}

.message_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.message_info_name {
  margin-right: 10px;
  font-weight: bold;
}

.message_info_time {
  font-size: 0.85em;
}

.left_message .message_bubble {
  border-bottom-left-radius: 0;
  overflow: hidden;
}

.left_message {
  margin-left: 5px;
}
.right_message {
  flex-direction: row-reverse;
  margin-right: 5px;
}

.right_message .message_bubble {
  background: var(--right-msg-bg);
  color: #fff;
  border-bottom-right-radius: 0;
  overflow: hidden;
}

.right_message .message_img {
  margin: 0 0 0 10px;
}
</style>
