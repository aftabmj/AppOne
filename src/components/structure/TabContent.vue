<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="primary">
      <v-tab value="one">Choose Template</v-tab>
      >
      <v-tab value="two">Findings</v-tab>
      >
      <v-tab value="three">Resulting Report</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <!-- <TemplateGallery />  -->
          <TemplateSelection />
        </v-window-item>

        <v-window-item value="two"> Audit Findings </v-window-item>

        <v-window-item value="three"> Draft Report </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { ref } from "vue";
// import TemplateGallery from "../TemplateGallery.vue";
import TemplateSelection from "../TemplateSelection.vue";

const tab = ref("one");
</script>
