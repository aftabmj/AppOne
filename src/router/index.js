// import { getAuth } from "firebase/auth";
// import { waitForAuthInitialized } from "@/auth";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/useAuthStore";
// import { getCurrentUser } from "vuefire";
// import Home from "@/views/Home.vue";
// import Dashboard from "@/views/Dashboard.vue";
// import SignUp from "@/views/SignUp.vue";
// import SignIn from "@/views/SignIn.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import(/* @viteChunkName: "home" */ "../views/Home.vue")
    },
    {
      path: "/dashboard",
      component: () =>
        import(/* @viteChunkName: "home" */ "../views/Dashboard.vue"),
      meta: {
        requiresAuth: true
      }
    },
    // { path: "/:pathMatch(.*)*", component: NotFound }
    {
      path: "/register",
      component: () =>
        import(/* @viteChunkName: "home" */ "../views/SignUp.vue")
    },
    {
      path: "/signIn",
      component: () =>
        import(/* @viteChunkName: "home" */ "../views/SignIn.vue")
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  let currentUser = await useAuthStore().getCurrentUser();
  // await waitForAuthInitialized();

  // let currentUser = getAuth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next("/signIn");
  else if (!requiresAuth && currentUser) next("/dashboard");
  else next();
});

export default router;
