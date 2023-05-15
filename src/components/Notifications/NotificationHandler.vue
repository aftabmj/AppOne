<template>
  <div class="root">
    <button @click="isOpen = true">Open</button>
    <div class="modal" v-if="isOpen">
      <H2>Modal header</H2>
      <p>mdal text</p>
      <button @click="isOpen = false">Close</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);
</script>

<style scoped></style>
