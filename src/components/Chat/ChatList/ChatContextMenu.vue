<template>
  <div
    class="chat_conxtext_menu_wrapper"
    :style="{ top: `${props.position.y}px`, left: `${props.position.x}px` }"
  >
    <div class="chat_context_menu">
      <div @click="InviteUser" class="chat_context_menu_item">Invite</div>
      <div @click="LeaveChat" class="chat_context_menu_item">Leave</div>
      <div class="host_only_line"></div>
      <div @click="ChangeIcon" class="chat_context_menu_item host_only">
        Change Icon
      </div>
      <div @click="ChangeName" class="chat_context_menu_item host_only">
        Change Name
      </div>
    </div>
  </div>
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
function InviteUser(): void {
  console.log('InviteUser');
}

function LeaveChat(): void {
  console.log('LeaveChat');
  if (confirm('Are you sure you want to leave this chat?')) {
    console.log('Leaving chat');
  }
}

function ChangeIcon(): void {
  if (/*Add hostonly conditional*/ false) {
    console.log('ChangeIcon');
  } else {
    console.warn("You don't have permission to do that");
  }
}

function ChangeName() {
  if (/*Add hostonly conditional*/ false) {
    console.log('ChangeName');
  } else {
    console.warn("You don't have permission to do that");
  }
}
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

  z-index: 100;
  isolation: isolate;
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
