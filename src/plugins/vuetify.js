import "vuetify/styles";
import { createVuetify } from "vuetify";
import { mdi } from "vuetify/iconsets/mdi-svg";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Vue.use(Vuetify);
const vuetify = createVuetify({
  components,
  directives,
  // TODO: optimize and only import the JS SVG fonts we want
  // https://vuetifyjs.com/en/features/icon-fonts/#material-design-icons
  icons: {
    defaultSet: "mdi",
    // aliases: {
    //   ...aliases,
    //   delete: "mdiDelete"
    //   // account: mdiAccount
    // },
    sets: {
      mdi
    }
  }
});
export default vuetify;
