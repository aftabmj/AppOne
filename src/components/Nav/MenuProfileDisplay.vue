<template>

    <div   v-if="user">
  <v-list-item
  
    :prepend-avatar="user.photoURL"
    :title="user.displayName"
    :subtitle="user.email"
  ></v-list-item>

    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/useAuthStore";

 const auth = useAuthStore();
const { user } = storeToRefs(auth)

    onMounted(async () => {
      await auth.waitForAuthInitialized();
      if (user.value !== undefined && user.value !== null) {
    if (user.value.displayName !== null) {
      const email = user.value.email;
      user.value.displayName = email.substring(0, email.indexOf("@"));
    }
  }
    })



</script>

<style scoped></style>
