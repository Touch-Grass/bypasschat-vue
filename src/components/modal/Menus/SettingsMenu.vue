<template>
  <div class="settings_menu shadow-lg rounded-xl">
    <div class="settings_menu_inner_wrapper">
      <div class="settings_menu_categories">
        <div class="settings_menu_categories_item four"><p>4</p></div>
        <div class="settings_menu_categories_item five"><p>5</p></div>
        <div class="settings_menu_categories_item six"><p>6</p></div>
      </div>

      <div class="settings_menu_items_wrapper">
        <div class="settings_menu_section one"><p>1</p></div>
        <div class="settings_menu_section two"><p>2</p></div>
        <div class="settings_menu_section three"><p>3</p></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  userData: any;
}

const props = defineProps<Props>();
</script>

<style>
.ModalName {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--d-text);
}
</style>

<style scoped>
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
  /* controls how much of the settings menu this should take up */
  width: 100%;
  background-color: orange;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.settings_menu_categories {
  /* controls how much of the settings menu this should take up ( value / 2 is total width) */
  width: 25%;
  background-color: blue;
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.settings_menu_inner_wrapper {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
