<template>
  <div class="profile_menu_wrapper">
    <div class="profile_view">
      <img
        @mouseover="hover = true"
        @mouseleave="hover = false"
        :src="props.userData.image"
        class="profile_image"
      />
      <span v-show="hover" class="profile_image_edit_text">Edit</span>
      <div class="h-[125px] flex items-center">
        <div class="profile_name">{{ props.userData.name }}</div>
      </div>
      <div class="line"></div>
    </div>
    <div class="edit_details_view">
      <div class="h-[calc(100%-125px)] w-[100%]">
        <h2 class="mt-1 select-none input_label">Edit your information</h2>
        <div class="mt-3"></div>
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Password" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  userData: any;
}
const hover = ref(false);

const props = defineProps<Props>();
</script>

<style scoped>
input:focus {
  border: transparent;
  outline: transparent;
}
input {
  color: var(--color);
  background-color: transparent;
}

.edit_details_view input::placeholder {
  text-align: center;
}

.profile_menu_wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0;
  grid-row-gap: 0;
}

.profile_view,
.edit_details_view {
  display: flex;
}

.edit_details_view {
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
}
.profile_view {
  justify-content: start;
  align-items: flex-start;
}

.profile_image,
.profile_name {
  user-select: none;
}

.profile_image {
  aspect-ratio: 1/1;
  border-radius: 50%;
  width: 150px;
  height: auto;
  margin-top: 10px;
  cursor: pointer;
  z-index: 1;
  -webkit-user-drag: false;
}
.profile_image:hover {
  filter: brightness(65%);
}
.profile_name {
  margin: 15px 0 0 15px;
  font-weight: bold;
}
.line {
  width: 100%;
  position: absolute;
  margin-top: 125px;
  height: 1px;
  background-color: #e0e0e0;
  box-shadow: 0px 0px 5px 0px white;
}
.profile_image_edit_text {
  position: absolute;
  /* isolation: isolate; */
  background-blend-mode: multiply;
  font-weight: bolder;
  transform: translate(69px, 70px);
  z-index: 2;
}
</style>
