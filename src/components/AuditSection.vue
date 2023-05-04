<template>
  <!-- <v-expansion-panels v-model="panels"> -->
  <v-expansion-panels v-model="panels" class="px-4 py-4">
    <!-- don't show, but the Risk component fetches the data in the background
  and once it emits risks:generated, we update risksDone and show it -->
    <Risk
      style="border-width: 1rem; border-color: brown"
      v-show="risksDone"
      :finding="myFinding"
      :risks="myRisks"
      @risks:generated="updateRiskPanel"
    />
    <v-progress-linear
      v-show="!risksDone"
      color="blue-lighten-3"
      indeterminate
      :height="9"
    ></v-progress-linear>

    <Recommendation
      v-if="risksDone"
      v-show="recomsDone"
      :finding="myFinding"
      :recommendations="myRecomms"
      @recommendations:generated="updateRecomPanels"
    />
    <v-progress-linear
      v-if="risksDone"
      v-show="!recomsDone"
      color="blue-lighten-3"
      indeterminate
      :height="9"
    ></v-progress-linear>
  </v-expansion-panels>

  <v-divider class="py-2"></v-divider>
  <!-- <v-spacer></v-spacer> -->
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import Risk from "./Risk.vue";
import Recommendation from "./Recommendation.vue";
// const showAsyncContent = ref(false);

const risksDone = ref(false);
const recomsDone = ref(false);
const panels = ref([]); // one each for findings, risk, recommendations
const props = defineProps(["auditGroup"]);
const myFinding = ref("");
const myRisks = ref("");
const myRecomms = ref("");
const emit = defineEmits(["audit:generated"]);

// as risks, recommedations become availble, open expand the panels..
function updateRiskPanel({ risks }) {
  // console.log("Updte panels", number);
  risksDone.value = true;
  panels.value.push(0);

  myRisks.value = risks;

  console.log("Panels", panels);
}

function updateRecomPanels({ recommendations }) {
  recomsDone.value = true;

  panels.value.push(1);
  myRecomms.value = recommendations;
  const updateObj = {
    id: props.auditGroup.id,
    finding: myFinding.value,
    risks: myRisks.value,
    recommendations: myRecomms.value,
    status: "complete"
  };
  console.log("Emiting audit:generated with ", updateObj);
  emit("audit:generated", updateObj);
  console.log("Panels", panels);
}

onBeforeMount(() => {
  console.log("finding passed in to audi section: ", props.auditGroup.finding);
  myFinding.value = props.auditGroup.finding;
  if (props.auditGroup.risks) {
    myRisks.value = props.auditGroup.risks;
    risksDone.value = true;
    panels.value.push(0);
  }
  if (props.auditGroup.recommendations) {
    myRecomms.value = props.auditGroup.recommendations;
    recomsDone.value = true;
    panels.value.push(1);
  }
  // watch(panels, value => {
  //   if (value.includes(0)) {
  //     showAsyncContent.value = true;
  //   }
  // });
});

const date = ref(null);
</script>
