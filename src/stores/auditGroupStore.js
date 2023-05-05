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
  orderBy
  // limit
} from "firebase/firestore";
import { db } from "@/db";

import { useAuthStore } from "./useAuthStore";

export const useAuditGroupStore = defineStore("auditGroups", () => {
  const firestoreUnsubscribe = ref(null);

  const userStore = useAuthStore();
  const { user: storeUser } = storeToRefs(userStore);
  const auditGroups = ref([]);

  watchEffect(() => {
    // If the user is logged out, call the Firestore unsubscribe function
    if (!storeUser) {
      if (firestoreUnsubscribe.value) {
        firestoreUnsubscribe.value();
      }
      auditGroups.value = [];
      return;
    }

    // If the user is logged in, set up the Firestore listener again
    if (firestoreUnsubscribe.value) {
      firestoreUnsubscribe.value();
    }
    firestoreUnsubscribe.value = fetchAuditGroups();
  });

  function getCollectionRef() {
    return collection(db, `auditGroups/${storeUser.value.uid}/active`);
  }

  async function addAuditGroup({ finding, status }) {
    const auditGroup = {
      // findingTitle: auditGroupName,
      finding: finding,
      // detailedFinding:
      // risk: risks,
      // recommendation: recommendations,
      status: status,
      created: Date.now()
    };
    // auditGroups.value.push(auditGroup);
    return await addDoc(getCollectionRef(), auditGroup);
  }

  // async function updateAuditGroupItem(auditGroup, auditGroupItem) {
  //   const docRef = doc(
  //     db,
  //     `auditGroups/${storeUser.value.uid}/active`,
  //     auditGroup.id
  //   );
  //   console.log(" docRef ", docRef);
  //   // const o3 = {...o1, ...o2}
  //   const docRef1 = await updateDoc(docRef, {
  //     ...auditGroupItem,
  //     lastModified: serverTimestamp()
  //   });
  //   return docRef1;
  // }

  async function updateAuditGroup(auditGroup) {
    const docRef = doc(
      db,
      `auditGroups/${storeUser.value.uid}/active`,
      auditGroup.id
    );
    console.log(" docRef ", docRef);

    const docRef1 = await updateDoc(docRef, {
      finding: auditGroup.finding,
      // detailedFinding: auditGroup.detailedFinding,
      risks: auditGroup.risks,
      recommendations: auditGroup.recommendations,
      lastModified: serverTimestamp()
    });
    return docRef1;
  }

  function deleteauditGroup(auditGroupId) {
    deleteDoc(doc(getCollectionRef(), auditGroupId));
  }

  function fetchAuditGroups() {
    console.log(" user ", storeUser);
    if (storeUser == undefined || !storeUser.value) return;

    const q = query(getCollectionRef(), orderBy("created", "desc"));

    const unsub = onSnapshot(q, querySnapshot => {
      const docs = [];
      querySnapshot.forEach(doc => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      auditGroups.value = docs;
    });

    return unsub;
  }

  return {
    auditGroups,
    fetchAuditGroups,
    addAuditGroup,
    deleteauditGroup,
    updateAuditGroup
  };
});

/*
    TODO: Modify this to use a query to get the last n auditGroups by LastModifiedTime
    which may be created/lastmodified time
  */
// function getRecentNAuditGroupsSorted(n) {
//   const todosQuery = query(
//     getCollectionRef(),
//     orderBy("created", "desc"),
//     limit(n)
//   );
//   const unsub = onSnapshot(todosQuery, querySnapshot => {
//     const docs = [];
//     querySnapshot.forEach(doc => {
//       docs.push({ id: doc.id, ...doc.data() });
//     });
//     // console.log("adding auditGroups to auditGroups.value");
//     auditGroups.value = docs;
//   });
//   return unsub;
// }
