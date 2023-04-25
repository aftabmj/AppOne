import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Vue.use(Vuetify);
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: "mdi" // default - only for display purposes
  }
});
export default vuetify;
