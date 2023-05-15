import { ref } from "vue";
import { defineStore } from "pinia";
import { getAuth } from "firebase/auth";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const auth = getAuth();

  function setUser(newUser) {
    user.value = newUser;
  }
  const waitForAuthInitialized = () => {
    return new Promise(resolve => {
      const unsubscribe = auth.onAuthStateChanged(() => {
        unsubscribe();
        resolve();
      });
    });
  };
  const getCurrentUser = async () => {
    if (user.value !== null) return user.value;
    await waitForAuthInitialized();
    return auth.currentUser;
  };

  async function signOut() {
    try {
      await auth.signOut();
      this.setUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  function watchAuthState() {
    auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });
  }

  return {
    user,
    watchAuthState,
    getCurrentUser,
    waitForAuthInitialized,
    setUser,
    signOut
  };
});
