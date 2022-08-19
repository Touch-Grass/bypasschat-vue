<template>
  <div class="flex justify-center items-center">
    <div @click="setTest" class="">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { database } from "../main";
import { ref, set } from "firebase/database";
export default defineComponent({
  data() {
    return {
      //       set(ref(database, "Testing"), {
      //           test: "Lets Go!",
      //   });
    };
  },
  components: {},
  methods: {
    setTest() {
      alert("Updated!");
      set(ref(database, "Testing"), {
        test: "The most modern test!",
      });
    },
  },
});
</script>

<style scoped>
button {
  background-color: blue;
  width: max-content;
  height: 3rem;
  border: red;
}
</style>
