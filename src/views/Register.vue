<!-- src/components/SignIn.vue -->
<template>
  <div>
    <h2>Register new account</h2>
    <form @submit.prevent="register">
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Register</button>
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
  createUserWithEmailAndPassword
} from "firebase/auth";

import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");

const register = () => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(data => {
      console.log("Successfully registered", data);
      console.log(auth.currentUser);
      router.push("/dashboard");
    })
    .catch(error => {
      console.log("Error registering", error);
    });
};

// ------------
// const authG = useFirebaseAuth();
// const googleAuthProvider = new GoogleAuthProvider();
// const user = useCurrentUser();
// try { // createUserWithEmailAndPassword(getAuth(), email.value,
//   password.value) // .then(data => { // console.log("Successfully registered",
// data); // router.push("/dashboard"") // }) // .catch(error => { //
// console.log("Error registering", error); // }); // await
// auth.signInWithEmailAndPassword(email.value, password.value); //
// router.push("/dashboard"); // } catch (error) { // console.error("Sign In
// Error:", error); // }
</script>
