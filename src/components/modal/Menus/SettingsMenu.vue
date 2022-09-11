<template>
  <div class="settings_menu shadow-lg rounded-xl">
    <div class="settings_menu_inner_wrapper">
      <div class="settings_menu_categories">
        <div @click="menuPage = 0" class="settings_menu_categories_item">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAACOklEQVRIid2VzUtVYRDGn7GMQsmblh4pMSRIisrKCLJFRIs+IGgRQVAQRIsM/4AicVO0s1q0aSNtihZamwqCEjflpsLaCC3UMCMryKSspF+LO4eOl/fezr2uauDAmXeemWdm3jNzpP9FLA0IqJK0UVKtpApJbyW9NrORebEDBhwGHgM/Ccsr4CxQWXQlwBpJtyRtlTQm6a6kAUkTkn54RZskHZLUKumdpHYz601bwQ7gE/AZOAWUJ2w1wJYc/B7gJfALOJ+GoAmYBEaAtTm2MmDU23TMz1YDy4EKoNdtp/9Gch+YBtYHbAuACQ90EtgJzAIfgCqgHHjk97c5H0GbB+gskMRKYJd/FPsd/w2odXudt/lhvgBXPYuaguXO9dkNbAAWA4v8rNPJW0IOg8DTtAQJv0bgo7dyhd8TQFeMKUvgI2WHrFhplFTt/vU+oMOS2mLAwgR4VFIrUGlm02kZzGwAOCppxsyGErFWxZhkJZclNUh6AnQB14AH/jlPAlfivgekX1IE1Lk+JWlpEAmcAMa9pzPAMNDnD0B3Hr97br/jej/womALgAxgOWd9wBSwJIDvdpJLPrTvY8KiBDjigfa5HpFdnj0+qJGfb3dcRykkEdn9dNH14/yRpgTuNvAdaCiaxAM8B4b8PQPcAC4k7Ac9keslEXiQc575gYBtL/AFGAOWzYckA7zxCT8DbCO76nu8gnECy7UUombgGXNlFrgJ1Id8Uv3jA0QmqUXSOklfJQ2aWSkr6R+T35bQh9KJlhuXAAAAAElFTkSuQmCC"
          />
          <span>Theme</span>
        </div>
        <div @click="menuPage = 1" class="settings_menu_categories_item">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAAA+UlEQVRIie2UsS5EQRhGz4hCvTYRIRpbbkFBJWo9ER6JRPYpqGxCuV6DUIgEhcRK1Kp7NDbhxp2Z3XsVwmm/zHcmM/MP/PMTqHvqhXqrDtTdpgU9v+eoKcFmhWDERqpjKsOznch3mpC0auZZkqtEfpnREUdtqy8V9zFUZ2tLPkTr6mNJcK+u5awPY4hmgC1gCXgABiGEt8m2/VvJOi61BXSAeWAOeAaegLsQwuvEdrWrHqo3alHxugr1Wj1Qu+OUL6rnkeIqCvVMXUgJOpGZyGWoLsck/ZqCEaefe8vfykr2ucZZjUmyhzPBl57pUngC7DcgOW6g46/yDraDo/KfftbuAAAAAElFTkSuQmCC"
          />
          <span>Profile</span>
        </div>
      </div>

      <div v-show="menuPage === 0" class="settings_menu_items_wrapper">
        <SettingsThemePage :userData="props.userData" />
      </div>

      <div v-show="menuPage === 1" class="settings_menu_items_wrapper">
        <SettingsChatInfo :chats="chats" :userData="props.userData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import { database } from "../../../assets/typescript/firebase";
import { ref as fbref, onValue, child } from "firebase/database";
import { ChatType, UserData } from "../../../assets/typescript/types";
import SettingsThemePage from "./SettingsMenuPages/SettingsThemePage.vue";
import SettingsChatInfo from "./SettingsMenuPages/SettingsChatInfo.vue";

/*
Page numbers are used to determine which page to show
0 = Theme
1 = Profile
ect...
*/
const menuPage: Ref<number> = ref(0);

interface Props {
  userData: UserData;
}

const props = defineProps<Props>();

const chats: any[] = [];

function initSettingUpdates() {
  const root = document.documentElement.style;
  changeProp("msgCol", newVal =>
    root.setProperty("--right-msg-bg", newVal as string)
  );
  changeProp("msgGlow", newVal =>
    newVal
      ? root.setProperty("--msg-glow", "0px")
      : root.setProperty("--msg-glow", "-8px")
  );
  changeProp("theme", newVal =>
    newVal
      ? (root.setProperty("--theme-main", "var(--theme-main-white)"),
        root.setProperty("--theme-dark", "var(--theme-dark-white)"),
        root.setProperty("--theme-light", "var(--theme-light-white)"),
        root.setProperty("--theme-color", "var(--theme-color-white)"),
        root.setProperty("--theme-tint", "var(--theme-tint-white)"))
      : (root.setProperty("--theme-main", "var(--theme-main-gray)"),
        root.setProperty("--theme-dark", "var(--theme-dark-gray)"),
        root.setProperty("--theme-light", "var(--theme-light-gray)"),
        root.setProperty("--theme-color", "var(--theme-color-gray)"),
        root.setProperty("--theme-tint", "var(--theme-tint-gray)"))
  );
}

function changeProp(
  prop: string,
  applyProp: (newVal: boolean | string) => void
) {
  const settingsRef = fbref(database, `Users/${props.userData.id}/Settings`);

  onValue(child(settingsRef, prop), snapshot => {
    if (snapshot.exists()) {
      applyProp(snapshot.val());
    }
  });
}

onMounted(() => initSettingUpdates());
</script>

<style>
.settings_menu_section label {
  user-select: none;
}

.settings_menu_heading {
  width: 100%;
  text-align: center;
  font-weight: bold;
  color: var(--theme-color);
  user-select: none;
}

.input_label {
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--theme-color);
}

.settings_menu_categories_item img,
.settings_menu_categories_item span {
  user-select: none;
}

.settings_menu_categories_item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 45px;
  color: var(--theme-color);
  font-weight: bolder;
  cursor: pointer;
}
.ModalName {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--d-text);
}
.message_color {
  border: transparent;
  padding: transparent;
  background-color: transparent;
}
.settings_menu_section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
}

.settings_menu_section:first-child {
  margin-top: -13px;
}
</style>

<style scoped>
input[type="color"]::-moz-color-swatch,
input[type="color"]::-webkit-color-swatch {
  border: transparent;
  outline: transparent;
  padding: 0;
  margin: 0;
}

.settings_menu {
  width: 100%;
  height: 100%;
}

.settings_menu_items_wrapper {
  width: 100%;
  background-color: var(--theme-main);
  display: flex;
  flex-direction: column;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.settings_menu_categories {
  min-width: 170px;
  max-width: 170px;
  background-color: var(--theme-light);
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.settings_menu_categories > div {
  cursor: pointer;
  width: 95%;
}
.settings_menu_categories > div:first-child {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin-top: 5px;
}
.settings_menu_categories > div:last-child {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}

.settings_menu_categories > div:hover {
  background-color: var(--theme-main);
}
.settings_menu_inner_wrapper {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
