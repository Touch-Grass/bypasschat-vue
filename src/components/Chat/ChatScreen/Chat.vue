<template>
  <div>{{ props.chat_id }}</div>
</template>

<script lang="ts" setup>
interface Props {
  chat_id: any;
}

const props = defineProps<Props>();
</script>
<style lang=""></style>
