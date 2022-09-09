<template>
  <div class="friend_option_wrapper">
    <button class="friend_remove_button">Remove</button>
  </div>
</template>

<script setup lang="ts">
import { UserData } from "../../../../assets/typescript/types";

interface Props {
  userData: UserData;
}

const props = defineProps<Props>();
</script>

<style scoped>
.friend_option_wrapper {
  width: 100%;
  height: 100%;
  background-color: var(--theme-main);
  border-radius: 10px;
  padding: 0.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.friend_remove_button:hover {
  color: rgb(205, 30, 30);
  background-color: var(--theme-tint);
}
.friend_remove_button {
  width: calc(100% - 1rem);
  height: 100%;
  background-color: var(--theme-gray);
  border-radius: 10px;
  border: none;
  color: var(--d-red);
  font-size: 1rem;
  font-weight: 500;
  transition: 250ms ease-out;
}
</style>
