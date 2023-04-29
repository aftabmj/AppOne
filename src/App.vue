<template>
  <ApplicationFrame>
    <template #app-title>
      Audi AI
      <!-- <img class="logo" src="../assets/logo.png" alt="Vue logo" /> -->
    </template>
    <template #append>
      <div v-if="!isLoggedIn">
        <router-link to="/register"> Register </router-link> |
        <router-link to="/signIn"> Sign In </router-link> |
        <router-link to="/"> Home </router-link> |
      </div>
      <div v-else>
        <button @click.prevent="handleSignOut">Sign Out</button>
      </div>
    </template>

    <template #main-content>
      <router-view />
    </template>
  </ApplicationFrame>
</template>

<script setup>
import ApplicationFrame from "./components/structure/ApplicationFrame.vue";
import { computed } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const userStore = useUserStore();
const isLoggedIn = computed(() => userStore.isLoggedIn);

const handleSignOut = async () => {
  const auth = getAuth();
  await userStore.logOutUser(signOut, auth); // to do handle error condtions
  router.push("/");
};
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
