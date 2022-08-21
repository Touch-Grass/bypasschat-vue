<!-- <template>
  <div class="flex justify-center items-center bg-blue-500">
    <div @click="setTest" class="">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { database, ref, set } from "../main";
export default defineComponent({
  data() {
    return {};
  },
  methods: {
    setTest() {
      alert("Updated!");
      set(ref(database, "Testing"), {
        test: "The most modern test!",
      });
    },
  },
});
</script> -->
