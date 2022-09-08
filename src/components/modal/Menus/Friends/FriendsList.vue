<template>
  <div class="friend_wrapper">
    <div class="friends_list_wrapper">
      <FriendDisplayItem
        :name="'CUBBY!!!'"
        :userData="props.userData"
      ></FriendDisplayItem>
      <FriendDisplayItem
        :name="'CUBBY!!!'"
        :userData="props.userData"
      ></FriendDisplayItem>
      <FriendDisplayItem
        :name="'CUBBY!!!'"
        :userData="props.userData"
      ></FriendDisplayItem>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FriendDisplayItem from "./FriendDisplayItem.vue";
interface Props {
  userData: any;
}
const props = defineProps<Props>();
</script>

<style scoped>
.friend_wrapper {
  max-height: 100%;
  width: calc(100% - 0.5rem);
}
.friends_list_wrapper {
  width: 100%;
  max-height: 100%;
  overflow: auto;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-shrink: 0;
}
</style>
