import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import HomePage from "../pages/HomePage.vue";
import SurahPage from "../pages/SurahPage.vue";

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
        {
          path: "/surah/:id",
          name: "surah",
          component: SurahPage,
        },
      ],
    },
  ],
});

export default router;
