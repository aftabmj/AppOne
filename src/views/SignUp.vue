<template>
  <v-card class="mx-auto" style="max-width: 500px">
    <v-toolbar color="deep-purple-accent-4" cards dark flat>
      <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-card-title class="text-h6 font-weight-regular"> Sign up </v-card-title>
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
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn variant="text" @click="$refs.formref.reset()"> Clear </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!formIsValid"
        :loading="isLoading"
        color="deep-purple-accent-4"
      >
        Submit
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
const isLoading = ref(false);
const dialog = ref(false);
const agreement = ref(false);
const formRef = ref(null);
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

// <script>
// export default {
//   data: () => ({
//     agreement: false,
//     dialog: false,
//     email: undefined,
//     form: false,
//     isLoading: false,
//     password: undefined,
//     // phone: undefined,
//     rules: {
//       email: v => !!(v || "").match(/@/) || "Please enter a valid email",
//       length: len => v =>
//         (v || "").length >= len || `Invalid character length, required ${len}`,
//       password: v =>
//         !!(v || "").match(
//           /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
//         ) ||
//         "Password must contain an upper case letter, a numeric character, and a special character",
//       required: v => !!v || "This field is required"
//     }
//   })
// };

//
</script>
