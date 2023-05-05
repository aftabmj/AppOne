import { useAuthStore } from "../stores/useAuthStore";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import(/* @viteChunkName: "home" */ "../views/Home.vue")
    },
    {
      path: "/generator",
      component: () =>
        import(/* @viteChunkName: "home" */ "../views/ResponseGenerator.vue"),
      meta: {
        requiresAuth: true
      }
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

  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  //page does not require auth and user is not logged in
  if (requiresAuth && !currentUser) next("/signIn");
  else if (!requiresAuth && currentUser) next("/generator");
  else next();
});

export default router;
