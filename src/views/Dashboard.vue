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
import { waitForAuthInitialized } from "@/auth";
import { useAuthStore } from "@/stores/useAuthStore";
import { storeToRefs } from "pinia";
import ToDo from "../components/ToDo.vue";

const user = ref(null);
onMounted(async () => {
  const userStore = useAuthStore();
  const { user: storeUser } = storeToRefs(userStore);
  await waitForAuthInitialized();
  user.value = storeUser.value;
});



</script>
