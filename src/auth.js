// import { ref } from "vue";
import { getAuth } from "firebase/auth";

// const user = ref(null);
// const authInitialized = ref(false);

// getAuth().onAuthStateChanged(currentUser => {
//   user.value = currentUser;
//   authInitialized.value = true;
// });

// const isAuthenticated = () => {
//   return user.value !== null;
// };

const waitForAuthInitialized = () => {
  return new Promise(resolve => {
    const unsubscribe = getAuth().onAuthStateChanged(() => {
      unsubscribe();
      resolve();
    });
  });
};
const getCurrentUser = async () => {
  await waitForAuthInitialized();
  return getAuth().currentUser;
};

export {
  // user, isAuthenticated,
  getCurrentUser,
  waitForAuthInitialized
};
