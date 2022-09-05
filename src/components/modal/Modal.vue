<template>
  <div class="modal" v-show="showModal">
    <div class="modal_wrapper shadow-2xl rounded-lg">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  showModal: boolean;
}

interface Emits {
  (e: "toggledVisible", visible: boolean): void;
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();

// const props = defineProps<Props>();
</script>
<style>
.modal_input {
  background-color: var(--theme-light);
  padding: 0.25rem;
  border-radius: 3px;
}
.modal_input:focus {
  border: transparent;
  outline: transparent;
}
</style>
<style scoped>
.modal {
  transition: 500ms;

  isolation: isolate;
}

.modal_wrapper {
  position: fixed;
  width: 80vw;
  height: 80vh;
  top: 50%;
  left: 50%;
  z-index: 110;

  background-color: var(--theme-light);
  transform: translate(-50%, -50%);
}
</style>
