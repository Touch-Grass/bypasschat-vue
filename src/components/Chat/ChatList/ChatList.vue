<template>
  <div class="list_wrapper">
    <div class="upper_wrapper">
      <img
        src="https://pbs.twimg.com/profile_images/1371936477848944649/C1LgElS5_400x400.jpg"
        alt="Profile Image"
        class="profile_image"
      />
      <h1 class="block profile_name">Name!</h1>
      <div class="reverse">
        <img
          class="mr-1"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAB/ElEQVRYhe2XO0sDQRSFv5jCIlj7iiAEFEQbbVXsI9hY2qfUQmNno+nyH+zzB7RRSEoVxVqxC8Qqxig+mrXIWXaS7E5210QRvDDM7JlzHzNz57HwL39UaoDTUWo/5Tzt49wtk1GNDcUIYEn1CZBQOe3oG2gAK6pvDOxa9WoMe74yDVwBB8CMsAWggjfdmwZ/08DL4iLdA9majhJAifa1vQXe1L4DtoGUwU8JuxPnTTqmjVJY52tSaADHQF3fn8Au9mUbEudTOnXZaOh7rZfzpBF5XtgwsAEshx2BuBvSRbbcmUzaFHN4o01beOvAGfACNNXOWvhpvFnJ2QKYBR7w1jrjwzki+Bw49OFn8HLjQT6sMgpcSOERbxdAa+QO8E5rrcdV9oQ5tM/EjGw4sjnay7krKaAqxTkDPxe266PjrvOZgc0Jq9K+a0LJk5RHDKwpbMyHP6a+ZwMbEfYU5CTqSeioTvj0JTs4QbxQAaSAV7WnDPxS9ZaPjotdGZi7k16JsAS2JMziJWEemFDZBz7oTsIMEZMwzDY8ZIDbMOxBlKWV7U36fBD9+lEM9stoj96XUZ5vXEau2K7je2CH7ut4R33fvo4h+EFSNgzaHiTzwmM/SGxSlKOCgRWEFaMai/MmrKheNDD3MVqOYS+yTBJ8Dkz8RADwyz8m/9JX+QLRONJ+SbNmWgAAAABJRU5ErkJggg=="
        />
      </div>
    </div>
    <div class="block mt-1 h-line"></div>
    <ul v-for="id in chatInfo">
      <ChatSelect :chat_id="id"></ChatSelect>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import ChatSelect from "./ChatSelect.vue";
import userData from "../../../App.vue";
const chatInfo: any[] = ["123", "132"];

chatInfo.push("231");
</script>

<style scope>
.list_wrapper {
  width: 100%;
}
.list_wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--d-gray);
}
.upper_wrapper {
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 70px;
}
.upper_wrapper .reverse {
  display: flex;
  width: 100%;
  justify-content: flex-end !important;
  align-items: flex-end !important;
}

.list_wrapper > ul {
  display: inline-block;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}
.h-line {
  width: 100%;
  height: 1px;
  background-color: white;
  box-shadow: 0px 0px 5px 0px rgb(255, 255, 255);
}
.profile_image {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 0.65rem;
  border: 1px solid white;
}
.profile_name {
  text-align: start;
  margin-left: 10px;
  font-size: 1.5rem;
}
</style>
