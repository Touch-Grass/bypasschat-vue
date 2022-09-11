<template>
  <div class="settings_menu_heading">Chat Info</div>
  <div class="choices_wrapper">
    <div>
      <div class="settings_menu_section">
        <label class="mr-5 input_label">TEst!!</label>
        <ToggleInput
          :user_id="(props.userData.id as string)"
          property="msgGlow"
          :default="true"
        />
      </div>
      <div class="mt-3"></div>
      <div class="settings_menu_section">
        <label class="mr-5 input_label"
          >Light Mode &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label
        >
        <ToggleInput
          :user_id="(props.userData.id as string)"
          property="theme"
          :default="false"
        />
      </div>
      <div class="mt-3"></div>
      <div class="settings_menu_section">
        <label class="mr-5 input_label">Message Color</label>
        <ColorInput
          :user_id="(props.userData.id as string)"
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
    <div class="chats_list_wrapper">
      <SettingsMenuChatList
        :chats="chats"
        :userData="props.userData"
      ></SettingsMenuChatList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatType, UserData } from "../../../../assets/typescript/types";
import ColorInput from "../Settings/ColorInput.vue";
import ToggleInput from "../Settings/ToggleInput.vue";
import SettingsMenuChatList from "../ChatList/SettingsMenuChatList.vue";

interface Props {
  userData: UserData;
}

const props = defineProps<Props>();

const chats: any[] = [];
</script>

<style scoped>
.chats_list_wrapper {
  width: 100%;
  height: 50px;
}

.choices_wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.choices_wrapper > div:first-child {
  /* The amount that the sliders / color input is compared to the chat list (100% is 50% of total) */
  flex-basis: 75%;
}
</style>
