import { getAuth } from "firebase/auth";
import { waitForAuthInitialized } from "@/auth";
import { createRouter, createWebHistory } from "vue-router";
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
  await waitForAuthInitialized();

  let currentUser = getAuth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  //page does not require auth and user is not logged in
  if (requiresAuth && !currentUser) next("/signIn");
  else if (!requiresAuth && currentUser) next("/generator");
  else next();
});

export default router;
