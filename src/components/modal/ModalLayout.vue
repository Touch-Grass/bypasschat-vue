<template>
  <div
    class="modal-bg"
    v-show="Object.values(props.modalData).includes(true)"
    @click="
      () => {
        emits('toggleModal', 'all', false);
      }
    "
  ></div>
  <div class="modals_wrapper">
    <Modal :showModal="props.modalData.settings">
      <SettingsMenu :userData="props.userData"></SettingsMenu>
    </Modal>

    <Modal :showModal="props.modalData.friends">
      <FriendsMenu :userData="props.userData"></FriendsMenu>
    </Modal>

    <Modal :showModal="props.modalData.profile">
      <ProfileMenu :userData="props.userData"></ProfileMenu>
    </Modal>

    <Modal :showModal="props.modalData.newChat">
      <NewChatMenu :userData="props.userData"></NewChatMenu>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import Modal from "./Modal.vue";
import SettingsMenu from "./Menus/SettingsMenu.vue";
import FriendsMenu from "./Menus/FriendsMenu.vue";
import ProfileMenu from "./Menus/ProfileMenu.vue";
import NewChatMenu from "./Menus/NewChatMenu.vue";

type ModalDataType = Record<string, boolean>;

interface Props {
  modalData: ModalDataType;
  userData: any;
}

interface Emits {
  (e: "toggleModal", selector: string, mode: boolean): void;
}

/* props.modalData =
{
  settings: false,
  friends: true,
  newChat: false
}

*/

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
</script>

<style scoped>
.modals_wrapper {
  position: fixed;
  z-index: 110;
}
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  backdrop-filter: blur(4px);
  animation: unblur 200ms ease-in-out;
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
