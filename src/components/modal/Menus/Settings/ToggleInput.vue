<template>
  <div>
    <label class="switch">
      <input v-model="checked" type="checkbox" @change="changeProperty" />
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { database } from "../../../../assets/typescript/firebase";
import { ref as fbref, set, onValue } from "firebase/database";

interface Props {
  user_id: string;
  property: string;
  default: boolean;
}

interface Emits {
  (e: "valChange", val: boolean): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const checked = ref(props.default);

initPropertyChange();

function initPropertyChange() {
  onValue(
    fbref(database, `Users/${props.user_id}/Settings/${props.property}`),
    (snapshot) => {
      if (snapshot.exists()) {
        checked.value = snapshot.val();
        emits("valChange", snapshot.val());
      }
    },
  );
}

function changeProperty() {
  set(
    fbref(database, `Users/${props.user_id}/Settings/${props.property}`),
    checked.value,
  );
}
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
