<template>
  <div class="settings_menu_heading">Theme</div>
  <div>
    <div class="settings_menu_section">
      <label class="mr-5 input_label">Message Glow</label>
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
</template>

<script setup lang="ts">
import { UserData } from "../../../../assets/typescript/types";
import ColorInput from "../Settings/ColorInput.vue";
import ToggleInput from "../Settings/ToggleInput.vue";

interface Props {
  userData: UserData;
}

const props = defineProps<Props>();
</script>

<style scoped></style>
