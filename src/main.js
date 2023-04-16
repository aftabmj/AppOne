import { createApp } from "vue";
import { createPinia } from "pinia";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { VueFire, VueFireAuth } from "vuefire";
import { initializeApp } from "firebase/app";

import { firebaseConfig } from "../firebaseConfig";
import App from "./App.vue";

const firebaseApp = initializeApp(firebaseConfig);
// const firestore = getFirestore(firebaseApp);

const vuetify = createVuetify({
  components,
  directives
});

const app = createApp(App);

app.use(vuetify);
app.use(createPinia());

app.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth()
  ]
});

app.mount("#app");
