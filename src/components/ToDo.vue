<template>
  <v-container style="max-width: 500px">
    <v-text-field
      v-model="newTask"
      label="Type a finding and press enter"
      variant="solo"
      @keydown.enter="createTask"
    >
      <template v-slot:append>
        <v-fade-transition>
          <v-icon v-if="newTask" @click="createTask"> mdi-plus-circle </v-icon>
        </v-fade-transition>
      </template>
    </v-text-field>

    <h2 class="text-h4 text-success ps-4">
      Findings:&nbsp;
      <v-fade-transition leave-absolute>
        <span :key="`tasks-${tasks.length}`">
          {{ tasks.length }}
        </span>
      </v-fade-transition>
    </h2>

    <v-divider class="mt-4"></v-divider>

    <v-row class="my-1" align="center">
      <strong class="mx-4 text-info-darken-2">
        Remaining: {{ remainingTasks }}
      </strong>

      <v-divider vertical></v-divider>

      <strong class="mx-4 text-success-darken-2">
        Completed: {{ completedTasks }}
      </strong>

      <v-spacer></v-spacer>

      <v-progress-circular
        v-model="progress"
        class="me-2"
      ></v-progress-circular>
    </v-row>

    <v-divider class="mb-4"></v-divider>

    <v-card v-if="tasks.length > 0">
      <v-slide-y-transition class="py-0" group tag="v-list">
        <v-list dense v-for="(task, i) in tasks" :key="`${i}-${task.text}`">
          <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

          <v-list-item dense>
            <v-list-item-action>
              <v-checkbox
                v-model="task.completed"
                :color="(task.completed && 'grey') || 'primary'"
              >
                <template v-slot:label>
                  <div
                    :class="(task.completed && 'text-grey') || 'text-primary'"
                    class="ms-4"
                    v-text="task.text"
                  ></div>
                </template>
              </v-checkbox>
              <v-btn @click="removeTask(i)" class="ma-2" variant="text">
                <v-icon color="red"> mdi-delete </v-icon>
              </v-btn>
            </v-list-item-action>

            <v-spacer></v-spacer>

            <v-scroll-x-transition>
              <v-icon v-if="task.completed" color="success"> mdi-check </v-icon>
            </v-scroll-x-transition>
          </v-list-item>
        </v-list>
      </v-slide-y-transition>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useTaskStore } from "@/stores/useTaskStore";

// import { useCollection } from 'vuefire'
// import { collection } from 'firebase/firestore'

// const todos = useCollection(collection(db, 'todos'))

const newTask = ref(null);
const taskStore = useTaskStore();
const { tasks, taskCount, completedTasks, remainingTasks } =
  storeToRefs(taskStore);

const progress = computed(() => (completedTasks.value / taskCount.value) * 100);

const createTask = () => {
  taskStore.addTask(newTask.value);
  newTask.value = null;
};
const removeTask = id => {
  taskStore.deleteTask(id);
};
</script>
