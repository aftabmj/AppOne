import { ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { collection, query, onSnapshot } from "firebase/firestore";
// import { useCollection } from "vuefire";
import { db } from "@/db";
import { useUserStore } from "./userStore";

export const useTasksStore = defineStore("tasks", () => {
  const userStore = useUserStore();
  const { storeUser: user } = storeToRefs(userStore);
  const tasks = ref([]);

  function fetchTasks() {
    console.log(" user ", user);
    if (user == undefined || !user.value) return;
    // tasks.value = useCollection(
    //   collection(db, `todos/${user.value.uid}/active`)
    // );

    const tasksRef = collection(db, `todos/${user.value.uid}/active`);
    const q = query(tasksRef);

    const unsub = onSnapshot(q, querySnapshot => {
      const docs = [];
      querySnapshot.forEach(doc => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      tasks.value = docs;
      console.log(" gto these docs ", docs);
    });

    return unsub;
  }

  // watch(user, async newValue => {
  //   if (newValue) {
  //     console.log("inide watch TasksStore user store set. goingto fetch");
  //     await fetchTasks();
  //   } else {
  //     tasks.value = [];
  //   }
  // });

  return {
    tasks,
    fetchTasks
  };
});
