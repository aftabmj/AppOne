import "vuetify/styles";
import { createVuetify } from "vuetify";
// import { mdi } from "vuetify/iconsets/mdi-svg";
// import { mdi } from "vuetify/iconsets/mdi-svg";
// import * as components from "vuetify/components";
// import * as directives from "vuetify/directives";
// import "material-design-icons-iconfont/dist/material-design-icons.css";
// import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
// import { mdiChevronDown, mdiChevronUp } from "@mdi/js";

import { md3 } from "vuetify/blueprints";

// Vue.use(Vuetify);
const vuetify = createVuetify({
  blueprint: md3,
  iconfont: "mdi",
  // components,
  // directives,
  // // TODO: optimize and only import the JS SVG fonts we want
  // // https://vuetifyjs.com/en/features/icon-fonts/#material-design-icons
  icons: {
    //   // defaultSet: "mdi",
    //   iconfont: "mdi",
    //   // values: {
    //   //   expand: mdiChevronDown, // Map the 'expand' icon name to the mdiChevronDown SVG path
    //   //   collapse: mdiChevronUp // Map the 'collapse' icon name to the mdiChevronUp SVG path
    //   // },
    //   // aliases: {
    //   //   ...aliases,
    //   //   delete: "mdiDelete"
    //   //   // account: mdiAccount
    //   // },
    sets: {
      md3
    }
  }
});
export default vuetify;
