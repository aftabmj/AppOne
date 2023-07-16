
# Setup 

.env file or environment variable should have : VITE_OPENAI_API_KEY=<key>

# start up:
npx vite --port=4000


# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

# hosting :

firebase init hosting
3 npm run build
4 firebase init hosting
5 npm install -g firebase-tools
6 firebase init emulators
7 firebase emulators:start
8 firebase deploy --only hosting
9 history

# ToDo :

- Fix login redirects - Dashboard shows blank page despite being logged in because we are not persising the tasks state on localStorage.

- use font similar to VueFire. E.g.: https://vuefire.vuejs.org/cookbook/subscriptions-external.html

- (PWA) Detect offline mode, load from local storage (for user)

-- suspend - clean way: https://www.youtube.com/watch?v=hUi5RcRyhxM

- feature : "Delete" just moves tasks out of /active into /archived
