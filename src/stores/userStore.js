import { ref } from "vue";
import { defineStore } from "pinia";

export const isLoggedIn = ref(false);

export const useUserStore = defineStore("user", () => {
  const storeUser = ref(null);

  function setUser(newUser) {
    storeUser.value = newUser;
    isLoggedIn.value = true;
  }

  function clearUser() {
    storeUser.value = null;
    isLoggedIn.value = false;
  }

  async function logOutUser(providerSignOutFunction, auth) {
    try {
      await providerSignOutFunction(auth);
      isLoggedIn.value = false; // watched by ToDO collection snapshot
      storeUser.value = null;
    } catch (error) {
      isLoggedIn.value = true;
      console.error("Error signing out", error);
    }
  }

  return {
    storeUser,
    setUser,
    clearUser,
    logOutUser,
    isLoggedIn
  };
});
