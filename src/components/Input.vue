<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      type: "text",
      value: "",
    };
  },
  methods: {},
  props: {
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
});
</script>
<template>
  <input
    class="block w-full py-3 px-1 mt-2 text-gray-500 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200 rounded-md placeholder:text-center"
    :placeholder="placeholder"
    :type="type"
  />
</template>
