<template>
  <div>
    <h2>{{ header }}</h2>
    <p>{{ msg }}</p>
    <button @click="$emit('close-popup')">Close</button>
  </div>
</template>

<script setup>
const props = defineProps({
  header: String,
  msg: String
});

defineEmits(["close-popup"]);
</script>

<style scoped></style>
