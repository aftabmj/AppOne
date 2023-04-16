<template>
  <v-app>
    <v-navigation-drawer app>
      <!-- Your navigation drawer content goes here -->
    </v-navigation-drawer>

    <v-app-bar app fixed>
      <v-toolbar-title>
        <slot name="app-title"></slot>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <template v-slot:append>
        <v-btn icon="mdi-heart">d</v-btn>

        <v-btn icon="mdi-magnify">A</v-btn>

        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
      <!-- 
      <v-btn text>
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-main>
      <v-container>
        <slot name="main-content"></slot>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- Your footer content goes here -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "ApplicationFrame"
};
</script>
