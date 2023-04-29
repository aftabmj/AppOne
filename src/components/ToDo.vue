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
        <span :key="`tasks-${taskCount}`">
          {{ taskCount }}
        </span>
      </v-fade-transition>
    </h2>

    <v-divider class="mt-4"></v-divider>

    <v-row class="my-1" align="center">
      <strong class="mx-4 text-info-darken-2">
        Remaining: {{ taskCount - completedTasks }}
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

    <v-card v-if="taskCount > 0">
      <v-slide-y-transition class="py-0" group tag="v-list">
        <v-list dense v-for="(task, i) in tasks" :key="`${i}-${task.text}`">
          <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

          <v-list-item dense>
            <v-list-item-action>
              <v-checkbox
                @click="toggleCompleted(task.id)"
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
              <v-btn @click="removeTask(task.id)" class="ma-2" variant="text">
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
import { useTasksStore } from "@/stores/useTaskStore";

const newTask = ref(null);
const taskStore = useTasksStore();
const { tasks } = storeToRefs(taskStore);

const taskCount = computed(() => {
  return tasks.value.length;
});

const completedTasks = computed(() => {
  return tasks.value.filter(task => task.completed).length;
});

const progress = computed(() => (completedTasks / taskCount) * 100);

const createTask = () => {
  taskStore.addTask(newTask.value);
  newTask.value = null;
};
const removeTask = id => {
  taskStore.deleteTask(id);
};
const toggleCompleted = id => {
  taskStore.toggleCompleted(id);
};
</script>
