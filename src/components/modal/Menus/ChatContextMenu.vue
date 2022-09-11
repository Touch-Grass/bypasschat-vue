<template>
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
</template>

<script setup lang="ts">
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

<style scoped></style>
