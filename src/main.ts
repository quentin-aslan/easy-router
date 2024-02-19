import "./assets/style.css";

import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import '@/mockdata/server'  // Import and run the MirageJS server

const app = createApp(App);

app.use(router);

app.mount("#app");
