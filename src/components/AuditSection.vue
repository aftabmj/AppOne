<template>
  <!-- <v-expansion-panels v-model="panels"> -->
  <v-expansion-panels v-model="panels">
    <Risk
      v-show="risksDone"
      :finding="myFinding"
      :finding-id="findingId"
      @risks:generated="updatePanels"
    />
    <v-progress-linear
      v-show="!risksDone"
      color="blue-lighten-3"
      indeterminate
      :height="9"
    ></v-progress-linear>
    <!-- rISK pANEL-->
    <!-- <Suspense v-if="showAsyncContent">
      <template #default>
        <Risk
          :finding="myFinding"
          :finding-id="findingId"
          @risks:generated="updatePanels"
        />
      </template>
      <template #fallback>
        <v-progress-linear
          color="blue-lighten-3"
          indeterminate
          :height="9"
        ></v-progress-linear>
      </template>
    </Suspense> -->

    <!-- recommendations pANEL-->

    <Recommendation
      v-if="risksDone"
      v-show="recomsDone"
      :finding="myFinding"
      :finding-id="findingId"
      @recommendations:generated="updatePanels"
    />
    <v-progress-linear
      v-if="risksDone"
      v-show="!recomsDone"
      color="blue-lighten-3"
      indeterminate
      :height="9"
    ></v-progress-linear>

    <!-- 
    <Suspense v-if="risksDone">
      <template #default>
        <Recommendation
          :finding="myFinding"
          :finding-id="findingId"
          @recommendations:generated="updatePanels"
        />
      </template>
      <template #fallback>
        <v-progress-linear
          color="blue-lighten-3"
          indeterminate
          :height="9"
        ></v-progress-linear
      ></template>
    </Suspense> -->

    <!--
    <v-expansion-panel>
      <v-expansion-panel-title v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="4" class="d-flex justify-start"> Location </v-col>
          <v-col cols="8" class="text--secondary">
            <v-fade-transition leave-absolute>
              <span v-if="open" key="0"> Select trip destination </span>
              <span v-else key="1">
                {{ trip.location }}
              </span>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row no-gutters>
          <v-spacer></v-spacer>
          <v-col cols="5">
            <v-select
              v-model="trip.location"
              :items="locations"
              chips
              flat
              variant="solo"
            ></v-select>
          </v-col>

          <v-divider vertical class="mx-4"></v-divider>

          <v-col cols="3">
            Select your destination of choice
            <br />
            <a href="#">Learn more</a>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" color="secondary"> Cancel </v-btn>
          <v-btn variant="text" color="primary"> Save </v-btn>
        </v-card-actions>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="4" class="d-flex justify-start">
            Start and end dates
          </v-col>
          <v-col cols="8" class="text--secondary">
            <v-fade-transition leave-absolute>
              <span v-if="open">When do you want to travel?</span>
              <v-row v-else no-gutters style="width: 100%">
                <v-col cols="6" class="d-flex justify-start">
                  Start date: {{ trip.start || "Not set" }}
                </v-col>
                <v-col cols="6" class="d-flex justify-start">
                  End date: {{ trip.end || "Not set" }}
                </v-col>
              </v-row>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row justify="space-around" no-gutters>
          <v-col cols="3">
            <v-text-field
              v-model="trip.start"
              label="Start date"
              type="date"
            ></v-text-field>
          </v-col>

          <v-col cols="3">
            <v-text-field
              v-model="trip.end"
              label="End date"
              type="date"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
     -->
  </v-expansion-panels>

  <v-divider class="py-2"></v-divider>
  <!-- <v-spacer></v-spacer> -->
</template>

<script setup>
import { ref, onBeforeMount, watch } from "vue";
import Risk from "./Risk.vue";
import Recommendation from "./Recommendation.vue";

// const expandedPanels = ref([]);
const showAsyncContent = ref(false);

const risksDone = ref(false);
const recomsDone = ref(false);
const panels = ref([0]); // one each for findings, risk, recommendations
// const panels = computed( )

// as risks, recommedations become availble, open expand the panels..
function updatePanels(number) {
  if (number === 0) risksDone.value = true;
  else recomsDone.value = true;

  panels.value.push(number);
  console.log("Panels", panels);
}

const props = defineProps(["finding", "findingId"]);

const myFinding = ref("");
onBeforeMount(() => {
  console.log("finding passed in to audi section: ", props.finding);
  myFinding.value = props.finding;
  watch(panels, value => {
    if (value.includes(0)) {
      showAsyncContent.value = true;
    }
  });
});

const date = ref(null);
const trip = ref({
  name: "",
  location: null,
  start: null,
  end: null
});
const locations = ref([
  "Australia",
  "Barbados",
  "Chile",
  "Denmark",
  "Ecuador",
  "France"
]);
</script>
