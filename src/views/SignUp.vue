<!-- src/components/SignIn.vue -->
<template>
  <v-card class="mx-auto" style="max-width: 500px">
    <v-toolbar color="deep-purple-accent-4" cards dark flat>
      <v-card-title class="text-h6 font-weight-regular">
        Register
      </v-card-title>
    </v-toolbar>
    <v-form
      ref="formref"
      fast-fail
      v-model="formIsValid"
      class="pa-4 pt-6"
      @submit.prevent="register"
    >
      <v-text-field
        v-model="email"
        :rules="[rules.email]"
        variant="filled"
        color="deep-purple"
        label="Email address"
        type="email"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[rules.password, rules.length(6)]"
        variant="filled"
        color="deep-purple"
        counter="6"
        label="Password"
        style="min-height: 96px"
        type="password"
      ></v-text-field>
      <!-- <v-text-field
        v-model="phone"
        variant="filled"
        color="deep-purple"
        label="Phone number"
      ></v-text-field> -->

      <v-checkbox
        v-model="agreement"
        :rules="[rules.required]"
        color="deep-purple"
      >
        <template v-slot:label>
          I agree to the&nbsp;
          <a href="#" @click.stop.prevent="dialog = true">Terms of Service</a>
          &nbsp;and&nbsp;
          <a href="#" @click.stop.prevent="dialog = true">Privacy Policy</a>*
        </template>
      </v-checkbox>
      <v-card-actions class="justify-center">
        <p v-if="errMsg">{{ errMsg }}</p>
        <v-btn type="submit" :disabled="!formIsValid" :loading="isLoading"
          >Register new account</v-btn
        >
      </v-card-actions>
    </v-form>

    <v-divider></v-divider>

    <!--     

    <v-card-actions class="justify-center">
      <v-btn @click="signInWithGoogle" outlined color="red">
        <v-icon left>mdi-google</v-icon>
        <v-spacer></v-spacer>
        Sign up with your Google account
      </v-btn>
    </v-card-actions> -->
    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn @click="signUpWithGoogle" outlined color="red">
        <v-icon left>mdi-google</v-icon>
        <v-spacer></v-spacer>
        Sign up with Google
      </v-btn>
    </v-card-actions>

    <v-dialog v-model="dialog" max-width="400" persistent>
      <v-card>
        <v-card-title class="text-h5 bg-grey-lighten-3"> Legal </v-card-title>
        <v-card-text>
          Legal stuff ...Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
          in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn variant="text" @click="(agreement = false), (dialog = false)">
            No
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="deep-purple"
            variant="tonal"
            @click="(agreement = true), (dialog = false)"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
// https://www.youtube.com/watch?v=xceR7mrrXsA
import { ref } from "vue";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const dialog = ref(false);
const agreement = ref(false);
// const formRef = ref(null);
const formIsValid = ref(false);
const rules = {
  email: v => !!(v || "").match(/@/) || "Please enter a valid email",
  length: len => v =>
    (v || "").length >= len || `Invalid character length, required ${len}`,
  password: v =>
    !!(v || "").match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
    "Password must contain an upper case letter, a numeric character, and a special character",
  required: v => !!v || "This field is required"
};
const errMsg = ref();

const handlePostLogin = auth => {
  console.log("Successfully logged in", auth.currentUser);
  const authStore = useAuthStore();
  authStore.setUser(auth.currentUser);
  router.push("/dashboard");
};

const register = () => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(data => handlePostLogin(auth))
    // .then(data => addUserToDatabase(auth, data))
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

const signUpWithGoogle = () => {
  const auth = getAuth();
  const googleAuthProvider = new GoogleAuthProvider();
  signInWithPopup(auth, googleAuthProvider)
    .then(data => handlePostLogin(auth))
    // .then(data => addUserToDatabase(auth, data))
    .catch(error => {
      console.log("Error signing in", error);
    });
};
</script>
