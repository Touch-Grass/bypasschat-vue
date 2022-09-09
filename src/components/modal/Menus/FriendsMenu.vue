<template>
  <div class="container">
    <div class="friend_search">
      <span class="input_label modal_title">Search for a friend to add!</span>
      <input
        v-model="friendsInput"
        type="text"
        ref="inputName"
        @change="searchFriends"
        class="modal_input friends_search_input"
        placeholder="Name"
      />
    </div>
    <div class="add_friend">
      <span class="input_label">Your Friends</span>
      <br />
      <small class="input_label friend_counter">You have 0 friends</small>
    </div>
    <div class="friends_list">
      <FriendsList :userData="props.userData"></FriendsList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { database } from "../../../assets/typescript/firebase";
import { ref as fbref, onChildAdded } from "firebase/database";
import FriendsList from "./Friends/FriendsList.vue";
import { UserData } from "../../../assets/typescript/types";
const friendsInput = ref("");

function searchFriends(): void {
  console.log(friendsInput.value);

  const usersRef = fbref(database, "Users");
  onChildAdded(usersRef, snapshot => {
    const data = snapshot.val();
    if (data.name === friendsInput.value) {
      console.log("Found a match!");
    }
  });
}

interface Props {
  userData: UserData;
}
const props = defineProps<Props>();
</script>
<style scoped>
.container {
  display: grid;
  grid-template-columns: 0.7fr 1.3fr;
  grid-template-rows: 0.4fr 1.6fr;
  gap: 0px 0px;
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
}
.friend_search,
.friends_list,
.add_friend {
  display: flex;
}
.friends_search_input {
  width: calc(100% - 1rem);
  flex: 0 0 calc(70% - 1rem);
  background-color: var(--theme-main);
}
.friend_counter {
  font-size: 15px;
}
.friend_search {
  justify-content: center;
  align-items: center;
  flex-direction: column;
  grid-area: 1 / 1 / 2 / 3;
}
.friends_list {
  grid-area: 2 / 2 / 3 / 3;
  max-height: 100%;
  height: 100%;
  overflow-y: auto;
}
.add_friend {
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  grid-area: 2 / 1 / 3 / 2;
}
.add_friend * {
  margin-left: 0.5rem;
}
.modal_title {
  margin-bottom: 10px;
}
</style>
