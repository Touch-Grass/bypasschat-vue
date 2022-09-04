<template>
  <label class="input_label">Create a new chat!</label>
  <div class="new_chat_wrapper">
    <button class="new_chat_button private_chat_button">Private Chat</button>
    <div class="mt-3"></div>
    <button class="new_chat_button group_chat_button">Group Chat</button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  userData: any;
}

const props = defineProps<Props>();
</script>

<style scoped>
.new_chat_wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.new_chat_button {
  background: var(--d-blue);
  border: transparent;
  padding: 0.75rem;
}
.new_chat_button:active {
  background: var(--d-blue-clicked);
}
</style>
