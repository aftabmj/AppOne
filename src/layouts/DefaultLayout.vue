<template>
  <v-app>
    <v-navigation-drawer app>
      <!-- Add your navigation items here -->
    </v-navigation-drawer>

    <v-app-bar app>
      <v-toolbar-title>App Title</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup></script>
