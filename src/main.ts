import { createApp } from "vue";
import "./assets/css/style.css";
import "./assets/css/tailwind/tailwind.css";
import {
  Booleanish,
  Numberish,
  Stringish,
} from "./assets/css/typescript/types";

export type { Booleanish, Numberish, Stringish };

import App from "./App.vue";
createApp(App).mount("#app");
