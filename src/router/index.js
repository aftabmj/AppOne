import { getAuth } from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Dashboard from "@/views/Dashboard.vue";
// import Register from "@/views/Register.vue";
import SignUp from "@/views/SignUp.vue";
import SignIn from "@/views/SignIn.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    {
      path: "/dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    // { path: "/:pathMatch(.*)*", component: NotFound }
    { path: "/register", component: SignUp },
    { path: "/signIn", component: SignIn }
  ]
});

router.beforeEach((to, from, next) => {
  let currentUser = getAuth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next("/signIn");
  else if (!requiresAuth && currentUser) next("/dashboard");
  else next();

  // if (to.matched.some(record => record.meta.requiresAuth)) {
  //   if (getAuth().currentUser) {
  //     next();
  //   } else {
  //     alert("you don't have access");
  //     next("/");
  //   }
  // }
});

export default router;
