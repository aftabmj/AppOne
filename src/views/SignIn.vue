<!-- src/components/SignIn.vue -->
<template>
  <div>
    <h2>Sign In</h2>
    <form @submit.prevent="signIn">
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <p v-if="errMsg">{{ errMsg }}</p>
      <button type="submit">Sign In</button>
    </form>
  </div>
  <!-- <div>
    <v-button @click="signInRedirectGoogle">Sign In with Google</v-button>
  </div> -->
</template>

<script setup>
// https://www.youtube.com/watch?v=xceR7mrrXsA
import { ref } from "vue";
// import { auth } from "../firebase";
import {
  // GoogleAuthProvider,
  // signInWithRedirect as signInRedirectGoogle,
  getAuth,
  signInWithEmailAndPassword
} from "firebase/auth";

import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const errMsg = ref();

const signIn = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(data => {
      console.log("Successfully logged in", data);
      console.log(auth.currentUser);
      router.push("/dashboard");
    })
    .catch(error => {
      console.log("Error signing in", error);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email address";
          break;
        case "auth/user-not-found":
          errMsg.value = "User not found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Wrong password";
          break;
        default:
          errMsg.value = "Unknown sign in error";
      }
    });
};
</script>
