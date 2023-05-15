<!-- src/components/SignIn.vue -->
<template>
  <!-- <VuePortal /> -->
  <v-card class="mx-auto" style="max-width: 500px">
    <v-toolbar color="deep-purple-accent-4" cards dark flat>
      <!-- <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn> -->
      <v-card-title class="text-h6 font-weight-regular"> Sign in </v-card-title>
    </v-toolbar>
    <v-card-actions class="justify-center">
      <v-btn
        @click="signInWithGoogle"
        :prepend-icon="mdiGoogle"
        class="text-none ms-4 text-white"
        color="red"
        variant="outlined"
        size="large"
      >
        Sign in with Google
      </v-btn>
    </v-card-actions>
    <v-card-actions class="justify-center">
      <v-btn
        @click="signInWithGoogle"
        :prepend-icon="mdiFacebook"
        class="text-none ms-4 text-white"
        variant="outlined"
        color="blue"
        size="large"
      >
        Sign in with facebook
      </v-btn>
    </v-card-actions>

    <v-divider></v-divider>

    <v-form
      fast-fail
      v-model="formIsValid"
      class="pa-4 pt-6"
      @submit.prevent="signIn"
    >
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
      <v-card-actions class="justify-center">
        <p v-if="errMsg" color="red">
          {{ errMsg }}
        </p>
        <p>
          <v-btn type="submit" :disabled="!formIsValid" variant="outlined"
            >Sign In</v-btn
          >
        </p>
      </v-card-actions>
    </v-form>
  </v-card>
  <vue-portal header-txt="{{errMsg}}" msg-txt="{{ errMsg }}" />
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
import { mdiGoogle, mdiFacebook } from "@mdi/js";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import VuePortal from "@/components/Notifications/VuePortal.vue";

const emit = defineEmits(["loginFailure"]);

const router = useRouter();

const email = ref("");
const password = ref("");
const formIsValid = ref(false);
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

const handlePostLogin = auth => {
  console.log("Successfully logged in", auth.currentUser);
  const userStore = useUserStore();
  userStore.setUser(auth.currentUser);
  router.push("/dashboard");
};

const signIn = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(data => handlePostLogin(auth))
    .catch(error => {
      console.log("Error signing in", error);
      errMsg.value = error.message;

      emit("loginFailure", { headerTxt: "Sign In Error", msgxt: errMsg.value });
    });
};

const signInWithGoogle = () => {
  const auth = getAuth();
  const googleAuthProvider = new GoogleAuthProvider();
  signInWithPopup(auth, googleAuthProvider)
    .then(data => handlePostLogin(auth))
    .catch(error => {
      console.log("Error signing in", error);
    });
};
</script>
<style scoped>
.passw-incorrect > .v-text-field__slot input {
  color: red;
}
</style>
