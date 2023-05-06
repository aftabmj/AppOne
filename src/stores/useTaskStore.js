import { ref, watchEffect } from "vue";
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
import { db } from "@/db";
import { useAuthStore } from "./useAuthStore";

export const useTasksStore = defineStore("tasks", () => {
  const userStore = useAuthStore();
  const { user: storeUser } = storeToRefs(userStore);
  const tasks = ref([]);

  const firestoreUnsubscribe = ref(null);

  watchEffect(() => {
    // If the user is logged out, call the Firestore unsubscribe function
    if (!storeUser.value) {
      if (firestoreUnsubscribe.value) {
        firestoreUnsubscribe.value();
      }
      tasks.value = [];
    } else {
      // If the user is logged in, set up the Firestore listener again
      if (firestoreUnsubscribe.value) {
        firestoreUnsubscribe.value();
      }
      firestoreUnsubscribe.value = getRecentNTasksSorted(5);
    }
  });

  function getCollectionRef() {
    return collection(db, `todos/${storeUser.value.uid}/active`);
  }

  function addTask(taskName) {
    const task = {
      text: taskName,
      completed: false,
      created: Date.now()
    };
    return addDoc(getCollectionRef(), task);
  }

  function toggleCompleted(id) {
    const task = tasks.value.find(task => task.id === id);
    updateDoc(doc(getCollectionRef(), task.id), {
      completed: !task.completed,
      lastModified: serverTimestamp()
    });
  }
  // function updateTask(task) {
  // for multi-field/generic update have to use patch

  function deleteTask(taskId) {
    deleteDoc(doc(getCollectionRef(), taskId));
  }

  /*
    TODO: Modify this to use a query to get the last n tasks by LastModifiedTime
    which may be created/lastmodified time
  */
  function getRecentNTasksSorted(n) {
    const todosQuery = query(
      getCollectionRef(),
      orderBy("created", "desc"),
      limit(n)
    );
    const unsub = onSnapshot(todosQuery, querySnapshot => {
      const docs = [];
      querySnapshot.forEach(doc => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      // console.log("adding tasks to tasks.value");
      tasks.value = docs;
    });
    return unsub;
  }

  // function fetchTasks() {
  //   console.log(" user ", user);
  //   if (user == undefined || !user.value) return;
  //   // const tasks1 = useCollection(
  //   //   collection(db, `todos/${user.value.uid}/active`)
  //   // );
  //   const q = query(todosCollectionRef);

  //   const unsub = onSnapshot(q, querySnapshot => {
  //     const docs = [];
  //     querySnapshot.forEach(doc => {
  //       docs.push({ id: doc.id, ...doc.data() });
  //     });
  //     tasks.value = docs;
  //     console.log(" gto these docs ", docs);
  //   });

  //   return unsub;
  // }

  return {
    tasks,
    // fetchTasks,
    getRecentNTasksSorted,
    addTask,
    deleteTask,
    toggleCompleted
  };
});
