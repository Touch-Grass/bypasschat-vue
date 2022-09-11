<template>
  <div
    class="chat_conxtext_menu_wrapper"
    :style="{ top: `${props.position.y}px`, left: `${props.position.x}px` }"
  ></div>
</template>
<!-- Height: 169px -->
<!-- Width: 127.183px -->

<script setup lang="ts">
interface Props {
  chat_id: string;
  position: {
    x: number;
    y: number;
  };
}

const props = defineProps<Props>();
</script>

<style scoped>
.chat_conxtext_menu_wrapper {
  box-sizing: border-box;
  position: fixed;
  width: min-content;
  height: max-content;
  padding: 0.25rem;
  border-radius: 0.75rem;

  margin: 5px 0 0 5px;
  background-color: var(--theme-dark);

  transition: background-color 300ms ease-in-out;
}
.chat_context_menu_item:first-child {
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
}
.chat_context_menu_item:last-child {
  border-bottom-left-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
}
.chat_context_menu_item {
  font-size: 1rem;
  white-space: nowrap;
  width: 100%;
  height: 100%;
  width: 100%;
  height: fit-content;
  background-color: var(--theme-dark);
  padding: 0.5rem;

  user-select: none;
  cursor: pointer;
}
.chat_context_menu_item:hover {
  background-color: var(--d-blue);
}

.host_only_line {
  width: 100%;
  height: 1px;
  background-color: white;
  box-shadow: 0 0 15 white;
  cursor: pointer;
}

.host_only {
  background-color: var(--theme-tint);
  cursor: not-allowed;
}
.host_only:hover {
  background-color: var(--theme-tint);
}
</style>
