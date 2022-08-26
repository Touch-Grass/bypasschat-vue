<template>
  <div class="settings_menu_wrapper">
    <div class="settings_menu center_align_transform shadow-lg rounded-xl">
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
  </div>
</template>
<script lang="ts" setup></script>
<style scoped>
.center_align_transform {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.settings_menu {
  width: 75vw;
  height: 75vh;
}

.settings_menu_wrapper {
  position: fixed;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(15px);
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
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}
.settings_menu_categories {
  /* controls how much of the settings menu this should take up ( value / 2 is total width) */
  width: 25%;
  background-color: blue;
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}

.settings_menu_inner_wrapper {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
