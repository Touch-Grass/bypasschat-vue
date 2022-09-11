<template>
  <div class="settings_menu_chatlist">
    <div v-for="chat in props.chats">
      <li>{{ chat }}</li>
    </div>
    {{ chats }}
  </div>
</template>

<script setup lang="ts">
import { ChatType, UserData } from "../../../../assets/typescript/types";

interface Props {
  userData: UserData;
  chats: ChatType;
}

const props = defineProps<Props>();
</script>

<style scoped>
.settings_menu_chatlist {
  width: 100%;
  height: 100%;
  background-color: blue;
}
</style>
