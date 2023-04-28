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
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signInWithEmailAndPassword
} from "firebase/auth";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const errMsg = ref();

// const { setUser } = userStore;

// onMounted(async () => {
//   // const currentUser = await getCurrentUser() // https://vuefire.vuejs.org/guide/auth.html
//   const auth = getAuth();
//   if (auth.currentUser) {
//     const to =
//       route.query.redirect && typeof route.query.redirect === "string"
//         ? route.query.redirect
//         : "/";

//     router.push(to);
//   }
// });

const handlePostLogin = (auth, data) => {
  console.log("Successfully logged in", data);
  const userStore = useUserStore();
  userStore.setUser(auth.currentUser);
  router.push("/dashboard");
};

const signIn = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(data => handlePostLogin(auth, data))
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
    .then(data => handlePostLogin(auth, data))
    .catch(error => {
      console.log("Error signing in", error);
    });
};
</script>
