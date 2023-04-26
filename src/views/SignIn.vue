<!-- src/components/SignIn.vue -->
<template>
  <v-card class="mx-auto" style="max-width: 500px">
    <v-form fast-fail class="pa-4 pt-6" @submit.prevent="signIn">
      <v-text-field
        type="email"
        v-model="email"
        variant="filled"
        placeholder="Email"
      ></v-text-field>
      <v-text-field
        type="password"
        v-model="password"
        placeholder="Password"
      ></v-text-field>
      <p v-if="errMsg">{{ errMsg }}</p>
      <v-btn type="submit">Sign In</v-btn>
    </v-form>
    <p></p>
    <div>
      <v-btn @click="signInWithGoogle">Sign In with Google</v-btn>
    </div>
  </v-card>
</template>

<script setup>
// https://www.youtube.com/watch?v=xceR7mrrXsA
import { ref } from "vue";
// import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
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

const signInWithGoogle = () => {
  const auth = getAuth();
  const googleAuthProvider = new GoogleAuthProvider();
  signInWithPopup(auth, googleAuthProvider)
    .then(data => {
      console.log("Successfully logged in", data);
      console.log(auth.currentUser);
      router.push("/dashboard");
    })
    .catch(error => {
      console.log("Error signing in", error);
    });
};
</script>
