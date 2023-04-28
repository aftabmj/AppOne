import { ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import {
  collection,
  query,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  orderBy,
  limit
} from "firebase/firestore";
// import { useCollection } from "vuefire";
import { db } from "@/db";
import { useUserStore } from "./userStore";

export const useTasksStore = defineStore("tasks", () => {
  const userStore = useUserStore();
  const { storeUser: user } = storeToRefs(userStore);
  const tasks = ref([]);
  const todosCollectionRef = collection(db, `todos/${user.value.uid}/active`);

  function addTask(taskName) {
    const task = {
      text: taskName,
      completed: false,
      created: Date.now()
    };
    addDoc(todosCollectionRef, task);
  }

  function toggleCompleted(id) {
    const task = tasks.value.find(task => task.id === id);
    updateDoc(doc(todosCollectionRef, task.id), {
      completed: !task.completed,
      lastModified: serverTimestamp()
    });
  }
  // function updateTask(task) {
  // for multi-field/generic update have to use patch

  function deleteTask(taskId) {
    deleteDoc(doc(todosCollectionRef, taskId));
  }

  /*
    TODO: Modify this to use a query to get the last n tasks by LastModifiedTime
    which may be created/lastmodified time
  */
  function getRecentNTasksSorted(n) {
    const todosQuery = query(
      todosCollectionRef,
      orderBy("created", "desc"),
      limit(n)
    );
    const unsub = onSnapshot(todosQuery, querySnapshot => {
      const docs = [];
      querySnapshot.forEach(doc => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      tasks.value = docs;
    });
  }

  function fetchTasks() {
    console.log(" user ", user);
    if (user == undefined || !user.value) return;
    // const tasks1 = useCollection(
    //   collection(db, `todos/${user.value.uid}/active`)
    // );
    const q = query(todosCollectionRef);

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
    // fetchTasks,
    getRecentNTasksSorted,
    addTask,
    deleteTask,
    toggleCompleted
  };
});
