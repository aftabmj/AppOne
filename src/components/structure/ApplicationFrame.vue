<template>
  <!-- <v-card> -->
  <v-layout>
    <div v-if="user">
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <MenuProfileDisplay />
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            :prepend-icon="mdiFolder"
            title="My Files"
            value="myfiles"
          ></v-list-item>
          <v-list-item
            :prepend-icon="mdiAccountMultiple"
            title="Shared with me"
            value="shared"
          ></v-list-item>
          <v-list-item
            :prepend-icon="mdiStar"
            title="Starred"
            value="starred"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>

    <v-app-bar color="white">
      <template #prepend>
        <v-app-bar-nav-icon>
          <v-btn :icon="mdiHeart"> </v-btn>
        </v-app-bar-nav-icon>
      </template>

      <v-app-bar-title><slot name="app-title" /></v-app-bar-title>

      <template #append>
        <slot name="append"></slot>
        <!-- <v-btn icon="mdi-dots-vertical"></v-btn> -->
      </template>
    </v-app-bar>

    <v-main>
      <v-container>
        <slot name="main-content"></slot>
      </v-container>
    </v-main>
  </v-layout>
  <!-- </v-card> -->
</template>

<script setup>
import { onMounted , ref} from "vue";

import { mdiFolder, mdiAccountMultiple, mdiStar, mdiHeart } from "@mdi/js";
import { useAuthStore } from "@/stores/useAuthStore";
import MenuProfileDisplay from "@/components/Nav/MenuProfileDisplay.vue";

import { storeToRefs } from "pinia";

const auth = useAuthStore();
const { user } = storeToRefs(auth)

    onMounted(async () => {
      await auth.waitForAuthInitialized();

    })

=
</script>
