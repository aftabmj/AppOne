<template>
  <nav>
    <div v-if="!isLoggedIn">
      <router-link to="/register"> Register </router-link> |
      <router-link to="/signIn"> Sign In </router-link> |
      <router-link to="/"> Home </router-link> |
    </div>
    <div v-else>
      <router-link to="/dashboard"> Dashboard </router-link> |
      <button @click="handleSignOut">Sign Out</button>
    </div>
  </nav>
  <router-view />
  <!--
  <TestFirestore /> -->
  <!-- <ApplicationFrame>
    <template v-slot:app-title> Audit AI </template>
    <template v-slot:main-content>
      <TestFirestore />
      < !-- <ToDo /> -- >
      < !-- < TabContent / >  
    </template>
  </ApplicationFrame> -->
</template>

<!-- script setup>
// import TabContent from "./components/structure/TabContent.vue";

// import ToDo from "./components/ToDo.vue";
// import TestFirestore from "./components/TestFirestore.vue";
< /script > -->
<script setup>
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const isLoggedIn = ref();
let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, user => {
    const userStore = useUserStore();
    if (user) {
      isLoggedIn.value = true;
      // userStore.setUser(user);
    } else {
      isLoggedIn.value = false;
      userStore.clearUser();
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    // isLoggedIn.value = false;
    router.push("/");
  });
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
