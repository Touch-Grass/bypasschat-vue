<template>
  <div class="list_wrapper">
    <h1 class="text-center"></h1>
    <ul v-for="id in chatInfo">
      <ChatSelect :chat_id="id"></ChatSelect>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import ChatSelect from "./ChatSelect.vue";
import userData from "../../../App.vue";
import { ref } from "vue";

const chatInfo: any[] = ["123", "132"];

chatInfo.push("231");
</script>

<style scope>
.list_wrapper {
  width: 100%;
}
.list_wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--d-gray);
}

.list_wrapper > ul {
  display: inline-block;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}
</style>
