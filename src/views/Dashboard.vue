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
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import ToDo from "../components/ToDo.vue";

// import ApplicationFrame from "./components/structure/ApplicationFrame.vue";

// const router = useRouter();
const user = ref(null);

onMounted(() => {
  const userStore = useUserStore();
  const { storeUser } = storeToRefs(userStore);
  user.value = storeUser.value;
});

// async function signOut() {
//   await auth.signOut();
//   router.push("/signin");
// }
</script>
