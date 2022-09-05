<template>
  <div class="settings_menu shadow-lg rounded-xl">
    <div class="settings_menu_inner_wrapper">
      <div class="settings_menu_categories">
        <div class="settings_menu_categories_item four"><p>4</p></div>
        <div class="settings_menu_categories_item five"><p>5</p></div>
        <div class="settings_menu_categories_item six"><p>6</p></div>
      </div>

      <div class="settings_menu_items_wrapper">
        <div class="settings_menu_section one">
          <label class="mr-5 input_label">Message Glow</label>
          <ToggleInput
            :user_id="props.userData.id"
            property="msgGlow"
            :default="true"
          />
        </div>
        <div class="mt-3"></div>
        <div class="settings_menu_section two">
          <label class="mr-5 input_label"
            >Light Mode &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label
          >
          <ToggleInput
            :user_id="props.userData.id"
            property="theme"
            :default="false"
          />
        </div>
        <div class="mt-3"></div>
        <div class="settings_menu_section two">
          <label class="mr-5 input_label">Message Color</label>
          <ColorInput
            :user_id="props.userData.id"
            property="msgCol"
            default="#4798f5"
          >
            <datalist id="presetColors">
              <option value="#4653c4" />
              <option value="#579ffb" />
              <option value="#F8C8DC" />
              <option value="#52D452" />
              <option value="#FF6961" />
            </datalist>
          </ColorInput>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import ToggleInput from "./Settings/ToggleInput.vue";
import ColorInput from "./Settings/ColorInput.vue";
import { database } from "../../../assets/typescript/firebase";
import { ref as fbref, onValue, child } from "firebase/database";


interface Props {
  userData: any;
}

const props = defineProps<Props>();
  
  onMounted(() => initSettingUpdates());
  
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
        root.setProperty("--theme-tint", "var(--theme-tint-white)"))
      : (root.setProperty("--theme-main", "var(--theme-main-gray)"),
        root.setProperty("--theme-dark", "var(--theme-dark-gray)"),
        root.setProperty("--theme-light", "var(--theme-light-gray)"),
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
</script>

<style>
.input_label {
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color);
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

.settings_menu_section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.settings_menu_items_wrapper {
  width: 100%;
  background-color: var(--theme-main);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.settings_menu_categories {
  width: 25%;
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
