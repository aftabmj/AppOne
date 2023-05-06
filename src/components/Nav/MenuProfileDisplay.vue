<template>
  <v-list-item
    :prepend-avatar="user.photoURL"
    :title="user.displayName"
    :subtitle="user.email"
  ></v-list-item>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";
const authStore = useAuthStore();

const dummyUser = {
  displayName: "John Doe",
  email: "",
  photoURL: ""
};

const getUserWithAdjustedDisplayName = user => {
  const dispName = user.displayName;
  const email = user.email;
  if (!dispName || dispName.length < 1) {
    user.displayName = email.substring(0, email.indexOf("@"));
  }
  return user;
};
// onMounted(() => {
//   console.log("Mounted");
//   console.log("user ", user.value);
//   userTmp = authStore.getCurrentUser();
// });

const user = computed(() =>
  authStore.user
    ? getUserWithAdjustedDisplayName(authStore.getCurrentUser())
    : dummyUser
);
</script>

<style scoped></style>
