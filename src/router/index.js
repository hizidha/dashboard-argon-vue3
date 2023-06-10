import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import AddTodo from "../views/AddTodo.vue"
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/signin",
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { auth: true },
      },
      {
        path: "/addtodo",
        name: "Addtodo",
        component: AddTodo,
      },
      {
        path: "/signin",
        name: "Signin",
        component: Signin,
        meta: { auth: true },
      },
      {
        path: "/signup",
        name: "Signup",
        component: Signup,
        meta: { auth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
