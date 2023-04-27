import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const storeUser = ref(null);

  function setUser(newUser) {
    storeUser.value = newUser;
  }

  function clearUser() {
    storeUser.value = null;
  }

  return {
    storeUser,
    setUser,
    clearUser
  };
});

// export const useUserStore = defineStore("user", {
//   state: () => ({
//     user: null
//   }),
//   actions: {
//     setUser(newUser) {
//       this.user = newUser;
//     },
//     clearUser() {
//       this.user = null;
//     }
//   }
// });
