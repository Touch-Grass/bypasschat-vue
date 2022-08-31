<template>
  <div class="user_wrapper" @click="userWrapperClicked">
    <img
      :src="props.userData.image ?? defaultImage"
      alt="Profile Image"
      class="profile_image"
    />
    <h1 class="block profile_name">{{ props.userData.name ?? "Error" }}</h1>
  </div>

  <div ref="dropdownMenu" v-show="dropdownOpen">
    <div class="dropdown_wrapper shadow-2xl">
      <li @click="toggleProfileMenu">Profile</li>
      <li @click="toggleFriendsMenu">Friends</li>
      <li @click="signOut">Logout</li>
    </div>
  </div>

  <Modal @toggledVisible="hideFriendsMenu" :showModal="friendsMenu"></Modal>
</template>
<script setup lang="ts">
import { ref, Ref } from "vue";
import { auth } from "../../../assets/typescript/firebase";
import Modal from "../../modal/Modal.vue";

interface Props {
  userData: any;
}
const defaultImage =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png";
const props = defineProps<Props>();

const dropdownOpen = ref(false);
const dropdownMenu = ref();
const friendsMenu: Ref<boolean> = ref(false);

function userWrapperClicked(): void {
  console.log("userWrapperClicked");
  dropdownOpen.value = !dropdownOpen.value;
}

function toggleProfileMenu(): void {
  console.log("toggleProfileMenu");
}

function hideFriendsMenu(): void {
  friendsMenu.value = false;
}

function toggleFriendsMenu(): void {
  console.log("toggleFriendsMenu");
  console.log(friendsMenu.value);
  friendsMenu.value = !friendsMenu.value;
}

function signOut(): void {
  auth.signOut();
  location.reload();
}
</script>
<style scoped>
.profile_image,
.settings_icon,
.profile_name {
  user-select: none;
}
.profile_name {
  text-align: start;
  margin-left: 10px;
  font-size: 1.5rem;
}
.user_wrapper {
  border-radius: 7px;
  display: flex;
  align-items: center;
  flex: 0 0 max-content;
  margin-left: 3px;
  padding-right: 12px;
  height: calc(100% - 6px);

  transform: 200ms ease-in;
}

.user_wrapper:hover {
  background-color: var(--d-light-gray);
}

.dropdown_wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  position: fixed;
  background-color: var(--d-dark-gray);
  width: 200px;
  height: fit-content;
  padding: 5px;
  z-index: 20;
  left: 5px;
  top: 65px;
  border-radius: 7px;

  animation: settingsSlide 200ms ease-in-out;
}

.dropdown_wrapper li {
  text-align: start;
  list-style: none;
  border-radius: 5px;
  width: 100%;
  padding-left: 5px;
  background-color: var(--d-dark-gray);
  user-select: none;
}
.dropdown_wrapper li:hover {
  background-color: var(--d-light-gray);
}

@keyframes settingsSlide {
  0% {
    transform-origin: top;
    transform: scaleY(0);
    opacity: 10%;
  }
  100% {
    opacity: 100%;
    transform: scaleY(100%);
  }
}
</style>
