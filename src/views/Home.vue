<template>
  <!-- <v-expansion-panels>
    <v-expansion-panel
      title="Title"
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima"
    >
    </v-expansion-panel>
  </v-expansion-panels> -->
  <v-container>
    <v-text-field
      v-model="newFinding"
      label="Type a finding and press enter"
      variant="solo"
    ></v-text-field>

    <v-btn @click="addAuditSection">
      <span v-if="!loading"> Generate Response for finding</span>
      <v-progress-circular v-else indeterminate color="white" size="24" />
    </v-btn>
  </v-container>
  <!-- <v-btn
    fixed
    align-content-end
    align-end
    color="primary"
    @click="createAndDownloadDocx(objList, 'BriefInternalAuditTemplate')"
  >

    Download Word Document
 
  </v-btn> -->
  <!-- <v-btn
    fixed
    align-content-end
    align-end
    color="primary"
    @click="createAndDownloadDocx(objList, 'BriefInternalAuditTemplate')"
  >
    Download Word Document
  </v-btn> -->
  <AuditSections :findings="findings" />

  <!-- <v-card>
    <v-card-title>List of Findings</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="(item, index) in findings" :key="index">
          <v-btn>{{ item }}</v-btn>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
  <v-expansion-panels>
    <v-expansion-panel v-for="(audFind, i) in findings" :key="i">
     
    </v-expansion-panel>
  </v-expansion-panels> -->
</template>

<script setup>
import { ref } from "vue";
import AuditSections from "../components/AuditSections.vue";
// import { createAndDownloadDocx } from "../file-util";

const newFinding = ref("");
// const inline = ref(null);
const findings = ref([]);
const loading = ref(false);

function addAuditSection() {
  findings.value.unshift(newFinding.value);
  newFinding.value = "";
}

const objList = ref([
  {
    finding: "finding1",
    risks: "risk1",
    recommendations: "recommendation1"
  },
  {
    finding: "finding2",
    risks: "risk2",
    recommendations: "recommendation2"
  },
  {
    finding: "finding3",
    risks: "risk3",
    recommendations: "recommendation3"
  }
]);
</script>
