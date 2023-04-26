<template>
  <div>
    <h2>Dashboard</h2>
    <div v-if="user">
      <h3>Welcome, {{ user.displayName }}</h3>
      <p>Email: {{ user.email }}</p>
      <ToDo />
    </div>
    <!-- <button @click="signOut">Sign Out</button> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// import { db, auth } from "../firebase";
// import { useRouter } from "vue-router";
import { getAuth } from "firebase/auth";
import ToDo from "../components/ToDo.vue";

// import ApplicationFrame from "./components/structure/ApplicationFrame.vue";

// const router = useRouter();
const user = ref(null);

onMounted(() => {
  user.value = getAuth().currentUser;
});

// async function signOut() {
//   await auth.signOut();
//   router.push("/signin");
// }

// auth.onAuthStateChanged(async firebaseUser => {
//   if (firebaseUser) {
//     // User is signed in, create or update the user document
//     const userRef = db.collection("users").doc(firebaseUser.uid);

//     await userRef.set(
//       {
//         displayName: firebaseUser.displayName,
//         email: firebaseUser.email
//         // Add other fields as needed
//       },
//       { merge: true }
//     );

//     user.value = await userRef.get();
//   }
// });
</script>
