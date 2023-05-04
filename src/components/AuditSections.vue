<template>
  <v-btn
    class="float-end"
    color="primary"
    @click="createAndDownloadDocx(auditGroups, 'BriefInternalAuditTemplate')"
  >
    Download Word Document
  </v-btn>
  <v-card class="mx-auto" style="max-width: 1000px; width: 90%">
    <AuditSection
      v-for="(f, index) in auditGroups"
      :key="`${index}-${f.finding}`"
      :audit-group="f"
      @audit:generated="updateNewAuditGroup"
    >
    </AuditSection>

    <!-- :finding="f.finding"
      :finding-id="index"
      :risks="f.risks"
      :recommendations="f.recommendations" -->
  </v-card>
</template>
<!-- <v-radio-group v-model="inline" inline justify-end>
      <v-radio label="Option 1" value="radio-1"></v-radio>
      <v-radio label="Option 2" value="radio-2"></v-radio>
    </v-radio-group> -->

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { createAndDownloadDocx } from "../file-util";
import AuditSection from "./AuditSection.vue";

import { useAuditGroupStore } from "../stores/auditGroupStore";
// import { mdiChevronDown, mdiChevronUp } from '@mdi/js'

const props = defineProps(["findings"]);
const auditGroupStore = useAuditGroupStore();
const { auditGroups } = storeToRefs(auditGroupStore);

const myAuditGroups = ref([]);

async function updateNewAuditGroup(auditGroup) {
  console.log("updateNewAuditGroup: ", auditGroup);
  const docRef = await auditGroupStore.updateAuditGroup(auditGroup);
  console.log(`updated audit group ${auditGroup.id} REfid:  ${docRef.id}`);

  // myAuditGroups.value.unshift(auditGroup);
  // myAuditGroups.value.unshift({ finding: newFinding.value });
  // findings.value.unshift(newFinding.value);
  // newFinding.value = "";
}

// const expandedPanels = ref([]);+++++++++++++++++++++++++++++++++++++
onMounted(() => {
  console.log("Mounted");
  // if (auditGroupStore.auditGroups) {
  //   myAuditGroups.value = auditGroupStore.auditGroups;
  // }
  // if (props.findings && props.findings.length > 0) {
  //   myAuditGroups.value.unshift({ finding: props.findings }); // this won't have risks/recom yet
  // }
  console.log("my aut groups ", myAuditGroups.value);
});

// function addAuditGroup({ finding, risks, recommendations }) {
//   console.log("Add to db");

//   auditGroupStore.addAuditGroup({
//     finding,
//     risks,
//     recommendations
//   });
// }

// const loading = ref(false);
// const response = ref([{ risks: "", recommendation: "" }]);
// const includes = ref(["ISO Standard Xx", "Some other spec"]);
// const response_types = ref({
//   risk: {
//     // type: "risk",
//     prompt_prefix:
//       "List a set of risks associated with the internal audit finding: ",
//     include_user_input: true
//   },
//   recommendation: {
//     // type: "recommendation",
//     prompt_prefix:
//       "List a set of recommendations associated with the above findings and risks",
//     include_user_input: false
//   }
// });
</script>
<!--<v-card class="mx-auto" style="max-width: 1000px">
    <v-toolbar flat color="blue-grey" dark>
      <v-toolbar-title
        >Finding {{ props.num }}: {{ newSectionHeader }}</v-toolbar-title
      >
    </v-toolbar>

    <v-card-text>
      <v-text-field
        v-model="newSectionHeader"
        label="Type brief heading for the first section."
        variant="filled"
      ></v-text-field>

      <v-textarea
        variant="filled"
        label="Type some details of your finding here."
        v-model="newFinding"
        placeholder="This is the description of the issue. Provide a clear and concise explanation of the finding. Explain the nature of the discrepancy, non-compliance, or weakness that was identified during the audit.
Audit criteria: Reference the specific standard, policy, procedure, or regulation that was not met or was violated. This provides context and helps readers understand the basis for the finding.
Optional:
Evidence: Present the specific data, documents, or observations that support the finding. This can include quotes from interviews, excerpts from documents, or any other relevant evidence that substantiates the issue."
      ></v-textarea>

      <v-item-group multiple selected-class="bg-purple">
        <div class="text-caption mb-2">
          Include (where appropriate) references to:
        </div>
        <v-item
          v-for="n in includes"
          :key="n"
          v-slot="{ selectedClass, toggle }"
        >
          <v-chip :class="selectedClass" @click="toggle"> {{ n }} </v-chip>
        </v-item>
      </v-item-group>
    </v-card-text>

    <v-divider></v-divider>
   
    <section v-if="response.risks !== ''">
      <v-toolbar flat size="5" color="light-grey" dark>
        <v-toolbar-title size="5">Associated Risks</v-toolbar-title>
        <v-btn color="success" @click="generateResponsesForPrompt">
          <span v-if="!loading">Re-Generate Associated Risks</span>
          <v-progress-circular v-else indeterminate color="white" size="24" />
        </v-btn>
        <v-btn color="warn" @click="response.risks = ''">
          <span>Clear</span>
        </v-btn>
      </v-toolbar>
      <v-divider class="my-2"></v-divider>
      <v-card>
        <v-card-text>
          <v-textarea v-model="response.risks"> </v-textarea>
        </v-card-text>
      </v-card>
    </section>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        v-if="response.risks === ''"
        color="success"
        @click="generateResponsesForPrompt('risk')"
      >
        <span v-if="!loading">Generate Associated Risk</span>
        <v-progress-circular v-else indeterminate color="white" size="24" />
      </v-btn>
      <v-btn
        v-else
        color="success"
        @click="generateResponsesForPrompt('recommendation')"
      >
        <span v-if="!loading">Generate Associated Recommendations</span>
        <v-progress-circular v-else indeterminate color="white" size="24" />
      </v-btn>
    </v-card-actions>
  </v-card>-->
