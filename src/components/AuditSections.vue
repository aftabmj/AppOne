<template>
  <v-card class="mx-auto" style="max-width: 1000px" color="yellow lighten-5">
    <AuditSection
      v-for="(f, index) in findings"
      :key="f"
      :finding="f"
      :finding-id="index"
    >
    </AuditSection>
  </v-card>
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
</template>
<!-- <v-radio-group v-model="inline" inline justify-end>
      <v-radio label="Option 1" value="radio-1"></v-radio>
      <v-radio label="Option 2" value="radio-2"></v-radio>
    </v-radio-group> -->

<script setup>
import { ref } from "vue";
import AuditSection from "./AuditSection.vue";

// import { mdiChevronDown, mdiChevronUp } from '@mdi/js'

const props = defineProps(["findings"]);

const newSectionHeader = ref("Inaccurate Financial Reporting");
const newFinding = ref("Invoices not recorded as a liability upon commitment");
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
