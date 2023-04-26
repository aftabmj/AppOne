import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import vuetify from "./plugins/vuetify";
import { VueFire, VueFireAuth } from "vuefire";
import { firebaseApp } from "@/db";

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(createPinia());

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()]
});

app.mount("#app");
