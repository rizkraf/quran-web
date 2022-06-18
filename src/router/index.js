import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import HomePage from "../pages/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "layout",
      component: DefaultLayout,
      children: [
        {
          path: "/",
          name: "home",
          component: HomePage,
        },
      ],
    },
  ],
});

export default router;
