<template>
  <div class="friend_item_wrapper">
    <span>
      <div class="name">
        <img class="friend_image" :src="(props.userData.image as string)" />
        {{ props.userData.name }}
        <div class="dots">
          <div class="friends_options_menu">
            <FriendOptions :userData="props.userData"></FriendOptions>
          </div>
          <div class="friend_dots">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAAjElEQVR4nO3UQQrCMBRF0eI6OrWLr+IGdEsd1A08B81IiaIRbPEc+KNwSQghXQcAAAAAAABQkaRPckhyLXNKMmylb1I2n/JoStKvvW9Wbr5mXHvfLMuTq5nX3t/bvRu8Ot/W+k8u4Pxk7bKBvk2SIfVPaL/2/iuy/MRjkrnM8Z3Nf90DAAAAAAAA/+cG2nL441aSB28AAAAASUVORK5CYII="
            />
          </div>
        </div>
      </div>
    </span>
  </div>
</template>

<script setup lang="ts">
import { UserData } from "../../../../assets/typescript/types";
import FriendOptions from "./FriendOptions.vue";
interface Props {
  userData: UserData;
}
const props = defineProps<Props>();
</script>

<style scoped>
.friend_item_wrapper {
  width: 100%;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  background-color: var(--theme-tint);
  padding: 0.75rem 0;
  border-radius: 10px;
  margin: 0.25rem 0;
}
.dots {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
.friends_list_wrapper span {
  width: calc(100% - 2rem);
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  background-color: var(--theme-tint);
  margin-top: 1rem;

  border-radius: 10px;
}
.friends_options_menu {
  position: absolute;
  width: 150px;
  height: 70px;
  transform: translate(100px, -24px);
}
.friend_dots {
  width: 20px;
  height: 20px;
  margin: 0 3px 0 0;
  transition: 100ms ease-out;
  transform-origin: center;
  backface-visibility: hidden;
}
.friend_dots:hover {
  cursor: pointer;
  transform: scale(1.3);
}

.friend_image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
  aspect-ratio: 1/1;
}

.name {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 0.5rem;
  height: 100% !important;
}
</style>
