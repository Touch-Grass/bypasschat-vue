import { createApp } from "vue";
import "./assets/css/style.css";
import "./assets/css/tailwind/tailwind.css";
import App from "./App.vue";

import {
  Booleanish,
  Numberish,
  Stringish,
} from "./assets/css/typescript/types";
export type { Booleanish, Numberish, Stringish };

createApp(App).mount("#app");
