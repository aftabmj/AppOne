import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import vuetify from "./plugins/vuetify";
import { VueFire, VueFireAuth } from "vuefire";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../config.json";

const firebaseApp = initializeApp(firebaseConfig);

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(createPinia());

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()]
});

app.mount("#app");
