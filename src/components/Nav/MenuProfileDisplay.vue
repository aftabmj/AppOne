<template>
  <v-list-item
    :prepend-avatar="user.photoURL"
    :title="user.displayName"
    :subtitle="user.email"
  ></v-list-item>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
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
const user = computed(() =>
  userStore.storeUser
    ? getUserWithAdjustedDisplayName(userStore.storeUser)
    : dummyUser
);
</script>

<style scoped></style>
