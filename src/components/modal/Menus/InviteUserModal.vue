<template>
  <div class="invite_user_modal_wrapper inner_modal_wrapper">
    <span class="settings_menu_heading">Modal Title</span>
    <div class="invite_users_layout">
      <div class="friends_list">
        <FriendsList :userData="props.userData"></FriendsList>
      </div>
      <div class="invite_panel">test</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserData } from '../../../assets/typescript/types';
import FriendsList from './Friends/FriendsList.vue';

interface Props {
  userData: UserData;
}
const props = defineProps<Props>();
</script>

<style scoped>
.invite_user_modal_wrapper {
  background-color: red;
}
.invite_users_layout {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-row-gap: 0px;
  height: calc(100% - 23px);
}

.friends_list {
  background-color: blue;
}
.invite_panel {
  background-color: green;
}
</style>
