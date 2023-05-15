<template>
  <ApplicationFrame>
    <template #app-title>
      Audi AI
      <!-- <img class="logo" src="../assets/logo.png" alt="Vue logo" /> -->
    </template>
    <template #append>
      <div v-if="!user">
        <router-link to="/register"> Register </router-link> |
        <router-link to="/signIn"> Sign In </router-link> |
        <router-link to="/"> Home </router-link> |
      </div>
      <div v-else>
        <button @click.prevent="handleSignOut">Sign Out</button>
        <router-link to="/dashboard"> Dashboard </router-link> |
      </div>
    </template>

    <template #main-content>
      <router-view />
    </template>
  </ApplicationFrame>
</template>

<script setup>
import ApplicationFrame from "./components/structure/ApplicationFrame.vue";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";

const router = useRouter();
// const userStore = useUserStore();
const isLoggedIn = computed(() => userStore.isLoggedIn);

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const handleSignOut = async () => {
  await authStore.signOut(); // to do handle error condtions
  router.push("/signIn");
};
onMounted(() => {
  console.log("App.vue mounted");
  // https://github.com/vuejs/pinia/discussions/1053
  authStore.watchAuthState();
  console.log("App: user", user);
});

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
