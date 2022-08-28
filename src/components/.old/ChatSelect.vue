<template>
  <div class="flex justify-center items-center h-screen w-screen bg-red-900">
    <div class="w-6/12 h-[33%] bg-gray-600 rounded-md shadow-md"></div>
  </div>
</template>

<script lang="ts">
export default {
  setup() {},
};
</script>

<style>
.chat_list_wrapper {
  width: calc(100% - 20px);
  padding: 5px;
  height: 100%;
  cursor: pointer;
  display: flex;

  /* Starts the flex to align */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: block;
  /* Puts in block at the end for text-alignment */
  background-color: var(--d-gray);
}

.chat_list_wrapper:hover {
  background-color: var(--d-light-gray);
}

.chat_list_wrapper p {
  text-align: start;
  padding-left: 5px;
}
</style>
