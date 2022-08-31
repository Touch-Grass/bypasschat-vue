<template>
  <div class="modal" v-show="showModal">
    <div class="modal-bg" @click="hideModal"></div>
    <div class="modal_wrapper shadow-2xl rounded-lg">
      <slot>Modal.js</slot>
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

function hideModal(): void {
  emits("toggledVisible", false);
}

// const props = defineProps<Props>();
</script>
<style scoped>
.modal {
  transition: 500ms;
}
.modal-bg {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  backdrop-filter: blur(4px);
  animation: unblur 200ms ease-in-out;
}
.modal_wrapper {
  position: fixed;
  width: 80vw;
  height: 80vh;
  top: 50%;
  left: 50%;
  z-index: 110;

  background-color: var(--d-light-gray);
  transform: translate(-50%, -50%);
}

@keyframes unblur {
  0% {
    opacity: 25%;
  }
  100% {
    opacity: 100%;
  }
}
</style>
