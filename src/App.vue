<script setup>
import ApplicationFrame from "./components/structure/ApplicationFrame.vue";
import TabContent from "./components/structure/TabContent.vue";

// import ToDo from "./components/ToDo.vue";
// import TestFirestore from "./components/TestFirestore.vue";
</script>

<template>
  <!--
  <TestFirestore /> -->
  <ApplicationFrame>
    <template v-slot:app-title> Audit AI </template>
    <template v-slot:main-content>
      <TabContent />
    </template>
  </ApplicationFrame>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
