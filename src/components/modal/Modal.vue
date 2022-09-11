<template>
  <div class="modal" v-show="props.showModal">
    <div
      class="modal_wrapper shadow-2xl rounded-lg"
      :style="{
        top: props.position?.y || '50%',
        left: props.position?.x || '50%',
        width: props.size?.width || '80vw',
        height: props.size?.height || '80vh',
        transform: props.position?.x ? 'none' : 'translate(-50%, -50%)',
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  showModal: boolean;
  position?: {
    x: string;
    y: string;
  };
  size?: {
    width: string;
    height: string;
  };
}

interface Emits {
  (e: 'toggledVisible', visible: boolean): void;
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();
</script>
<style>
.inner_modal_wrapper {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

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

  z-index: 110;

  background-color: var(--theme-light);
  transform: translate(-50%, -50%);
}
</style>
