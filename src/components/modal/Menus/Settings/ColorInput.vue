<template>
  <div>
    <input v-model="colorVal" type="color" @change="changeProperty" />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { database } from "../../../../assets/typescript/firebase";
import { ref as fbref, set, onValue } from "firebase/database";

interface Props {
  user_id: string;
  property: string;
  default: string;
}

const props = defineProps<Props>();

const colorVal = ref(props.default);

initPropertyChange();

function initPropertyChange() {
  onValue(
    fbref(database, `Users/${props.user_id}/Settings/${props.property}`),
    (snapshot) => {
      if (snapshot.exists()) colorVal.value = snapshot.val();
    },
  );
}

function changeProperty() {
  console.log(colorVal.value);
  set(
    fbref(database, `Users/${props.user_id}/Settings/${props.property}`),
    colorVal.value,
  );
}
</script>

<style scoped></style>
