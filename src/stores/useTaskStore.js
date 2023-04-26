import { defineStore } from "pinia";

//check the factory pattern:
//https://stackoverflow.com/questions/71583063/how-to-pass-an-argument-to-pinia-store

export const useTaskStore = defineStore("todoList", {
  state: () => ({
    tasks: [],
    id: 0,
    loading: false
  }),
  getters: {
    taskCount: state => {
      return state.tasks.length;
    },
    completedTasks: state => {
      return state.tasks.filter(task => task.completed).length;
    },
    remainingTasks: state => state.taskCount - state.completedTasks
  },
  actions: {
    addTask(text) {
      if (text.length === 0) return;
      this.tasks.push({ text, id: this.id++, completed: false });
    },
    deleteTask(itemID) {
      const index = this.tasks.findIndex(task => task.id === itemID);
      this.tasks.splice(index, 1);
    }
  }
});

// // export factory function
// export function createSomeStore(storeId: string, param1: string ...) {
//   return defineStore(storeId, () => {
//     // Use param1 anywhere
//   })()
// }

// // Export store instances that can be shared between components ...
// export const useAlphaStore = createSomeStore('alpha', 'value1');
// export const useBetaStore = createSomeStore('beta', 'value2');
