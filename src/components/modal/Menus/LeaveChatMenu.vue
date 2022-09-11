<template>
  <div class="leave_chat_menu_wrapper"></div>
</template>

<script setup lang="ts">
import { UserData } from '../../../assets/typescript/types';
interface props {
  userData: UserData;
}
const props = defineProps<props>();
</script>

<style scoped>
.leave_chat_menu_wrapper {
  width: 100%;
  height: 100%;
  background-color: red;
}
</style>
