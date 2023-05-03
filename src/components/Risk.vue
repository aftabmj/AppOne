<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      <template v-slot:default="{ expanded }">
        <v-row no-gutters>
          <v-col cols="4" class="d-flex justify-start"> Risks </v-col>
          <v-col cols="8" class="text-grey">
            <v-fade-transition leave-absolute>
              <span v-if="expanded" key="0"> for "{{ myFinding }}" </span>
              <span v-else key="1"> for "{{ myFinding }}" </span>
            </v-fade-transition>
          </v-col>
        </v-row>
      </template>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-textarea v-model="myRisks" hide-details></v-textarea>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { queryChatGPT } from "@/services/chatGPTService";
import { prompt_types } from "../prompts";

const props = defineProps(["finding", "findingId"]);
const emit = defineEmits(["risks:generated"]);

const myFinding = ref("");
const myRisks = ref("");
const loading = ref(false);

onMounted(() => {
  myFinding.value = props.finding;
  generateRisksForPrompt();
});

async function generateRisksForPrompt() {
  if (myFinding.value.trim() === "") return;
  loading.value = true;

  const rt = prompt_types["risk"];
  const promptPrefix = rt["prompt_prefix"];

  // if (rt.include_user_input)
  //   response.value[response_type] = await queryChatGPT(
  //     rt.prompt_prefix + newFinding.value
  //   );
  // else

  myRisks.value = await queryChatGPT(promptPrefix + myFinding.value);
  emit("risks:generated", props.findingId);

  // em("update:modelValue", 0);
  // em("group:selected", { 0: true });
  // await this.$emit("async-call");
  loading.value = false;

  // console.log(" myFinding.value", myFinding.value);
}
</script>
