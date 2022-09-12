<template>
  <div
    class="chat_list_wrapper"
    @contextmenu="toggleContextMenu"
    @click="selectedChat"
    ref="chatRef"
  >
    <img :src="chat.image ?? defaultChatImage" class="chat-img" />
    <p>{{ chat.name }}</p>
  </div>

  <div ref="contextMenu">
    <ChatContextMenu
      v-show="showContextMenu"
      :chat_id="props.chat_id"
      :position="contextMenuPos"
      :align="contextMenuAlign"
      @toggleModal="(selector, mode) => emits('toggleModal', selector, mode)"
    ></ChatContextMenu>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
import { database } from '../../../assets/typescript/firebase';
import { ref as fbref, onValue } from 'firebase/database';
import { defaultChatImage } from '../../../assets/typescript/Variables';
import ChatContextMenu from './ChatContextMenu.vue';
import Modal from '../../modal/modals/Modal.vue';

interface Emits {
  (e: 'selectedChat', id: string): void;
  (e: 'toggleModal', selector: string, mode: boolean): void;
}

interface Props {
  chat_id: string;
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();

const chatRef = ref();
const chat = ref({
  name: '',
  image: '',
});

const contextMenu = ref();
const contextMenuPos = ref({
  x: 0,
  y: 0,
});
const contextMenuAlign = ref(false);
const showContextMenu = ref(false);

initChatSelect();

/**
 * @param {string} chat_id The ID of the chat to select
 */
function initChatSelect(chat_id: string = props.chat_id): void {
  const chatRef = fbref(database, `Chats/${chat_id}`);
  onValue(chatRef, snapshot => {
    const data = snapshot.val();
    chat.value.name = data?.name;
    chat.value.image = data?.image;
  });
}

function initContextMenu(): void {
  ['click', 'contextmenu'].forEach((eventName: string) => {
    document.addEventListener(eventName, (e: any) => {
      if (
        !contextMenu.value.contains(e.target) &&
        !chatRef.value.contains(e.target)
      )
        showContextMenu.value = false;
    });
  });
}

function toggleContextMenu(e: MouseEvent): void {
  e.preventDefault();
  console.log(`Toggled Context Menu for ${chat.value.name}`);
  contextMenuPos.value.x = e.clientX;
  contextMenuPos.value.y = e.clientY;
  if (contextMenuPos.value.x > 115) contextMenuAlign.value = true;
  else contextMenuAlign.value = false;
  showContextMenu.value = !showContextMenu.value;
}

// Returns what ever chat is selected (return is an emit to other modules)
function selectedChat(): void {
  emits('selectedChat', props.chat_id);
}

onMounted(() => initContextMenu());
</script>

<style>
.chat_list_wrapper {
  width: 100%;
  padding: 5px;
  height: 100%;
  cursor: pointer;
  display: flex;

  border-radius: 10px;

  /* Starts the flex to align */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: block;
  /* Puts in block at the end for text-alignment */
  background-color: var(--theme-main);
}

.chat_list_wrapper:hover {
  background-color: var(--theme-light);
}

.chat_list_wrapper p {
  text-align: start;
  padding-left: 5px;
}

.chat-img {
  user-select: none;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  background: #ddd;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
}
</style>
