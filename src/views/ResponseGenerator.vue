<template>
  <!-- <v-expansion-panels>
    <v-expansion-panel
      title="Title"
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima"
    >
    </v-expansion-panel>
  </v-expansion-panels> -->
  <v-container>
    <v-textarea
      v-model="newFinding"
      label="Type a finding or several findings one after another (separate lines)."
      variant="solo"
    ></v-textarea>

    <v-row>
      <v-col cols="12" class="d-flex justify-space-between">
        <v-btn @click="addAuditSection">
          <span v-if="!loading"> Generate Response for finding</span>
          <v-progress-circular v-else indeterminate color="white" size="24" />
        </v-btn>
        <!-- <v-btn
          class="float-end"
          color="primary"
          @click="createAndDownloadDocx(objList, 'BriefInternalAuditTemplate')"
        >
          Download Word Document
        </v-btn> -->
      </v-col>
    </v-row>
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

  <AuditSections />

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
import { useAuditGroupStore } from "../stores/auditGroupStore";

const newFinding = ref("Invoices not recorded as a liability upon commitment");
// const newSectionHeader = ref("Inaccurate Financial Reporting");

// const newFinding = ref("");
// const inline = ref(null);
// const findings = ref([]);
const loading = ref(false);

const auditGroupStore = useAuditGroupStore();
// const { auditGroups } = storeToRefs(auditGroupStore);

async function addAuditSection() {
  if (newFinding.value.trim() === "") return;

  const docRef = await auditGroupStore.addAuditGroup({
    finding: newFinding.value,
    status: "incomplete"
  });
  console.log(`added new finding . ${newFinding.value} REfid:  ${docRef.uid}`);

  // myAuditGroups.value.unshift({ finding: newFinding.value });
  // findings.value.unshift(newFinding.value);

  newFinding.value = "";
}

// const objList = ref([
//   {
//     finding: "finding1",
//     risks: "risk1",
//     recommendations: "recommendation1"
//   },
//   {
//     finding: "finding2",
//     risks: "risk2",
//     recommendations: "recommendation2"
//   },
//   {
//     finding: "finding3",
//     risks: "risk3",
//     recommendations: "recommendation3"
//   }
// ]);
</script>
