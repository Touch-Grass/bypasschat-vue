<template>
  <div class="profile_menu_wrapper">
    <div class="profile_view">
      <div
        class="image_wrapper"
        @mouseover="hover = true"
        @mouseleave="hover = false"
      >
        <img :src="props.userData.image" class="profile_image" />
        <input type="file" id="fileImageUpload" />
        <label
          v-show="hover"
          for="fileImageUpload"
          class="profile_image_edit_text"
          >Edit</label
        >
      </div>
      <div class="h-[125px] flex items-center">
        <div class="profile_name">{{ props.userData.name }}</div>
      </div>
      <div class="line"></div>
    </div>
    <div class="edit_details_view">
      <div class="h-[calc(100%-125px)] w-[100%]">
        <div class="changed_info">
          <h2 class="mt-1 select-none input_label">Edit information</h2>
          <div class="mt-3"></div>
          <input type="text" placeholder="Name" :value="props.userData.name" />
          <br />
          <div class="my-1"></div>
          <input
            type="password"
            placeholder="password"
            :value="props.userData.password"
          />
        </div>
        <div class="enter_info">
          <h2 class="mt-1 select-none input_label">Verify your password</h2>
          <div class="mt-3"></div>
          <input type="text" placeholder="Password" required />
          <div class="my-2"></div>
          <button class="change_info_button" type="submit">Change</button>
        </div>
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
  min-width: 100px;
  min-height: auto;
  height: auto;
  margin-top: 10px;
  cursor: pointer;
  z-index: 1;
  -webkit-user-drag: false;
}
.image_wrapper:hover > .profile_image {
  filter: brightness(65%);
}
.profile_name {
  margin: 30px 0 0 15px;
  font-weight: bold;
}
.line {
  width: 100%;
  position: absolute;
  margin-top: 125px;
  height: 1px;
  background-color: #e0e0e0;
  box-shadow: 0px 0px 5px 0px white;
  z-index: -10;
}
@media (max-width: 425px) {
  .line {
    margin-top: 100px;
  }
  .profile_name {
    margin: 0px 0 0 15px;
  }
}

.enter_info {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  height: calc(100% - 110px);
  align-items: center;
}
.profile_image_edit_text {
  position: absolute;
  isolation: isolate;
  color: white;
  font-weight: bolder;
  transform: translate(-40px, -115px);
  z-index: 5;
  padding: 30px;
}

input[type="text"],
input[type="password"] {
  background-color: var(--d-gray);
  padding: 0.25rem;
  border-radius: 5px;
}

.image_wrapper:hover {
  filter: brightness(65%);
}
.image_wrapper > input {
  position: absolute;
  display: none;
}
.change_info_button {
  background-color: var(--d-blue);
  border: none;
  padding: 0.75rem;
}
.change_info_button:active {
  background-color: var(--d-blue-clicked);
}
</style>
