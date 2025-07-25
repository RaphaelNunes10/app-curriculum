import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import MyCurriculaPage from "@/views/MyCurriculaPage.vue";
import EditPage from "@/views/EditPage.vue";
import AboutPage from "@/views/AboutPage.vue";
import LicensePage from "@/views/LicensePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/my-curricula",
  },
  {
    path: "/my-curricula",
    name: "My Curricula",
    component: MyCurriculaPage,
  },
  {
    path: "/create",
    name: "Create Curriculum",
    component: EditPage,
  },
  {
    path: "/edit/:id",
    name: "Edit Curriculum",
    component: EditPage,
  },
  {
    path: "/about",
    name: "About App",
    component: AboutPage,
  },
  {
    path: "/license-info",
    name: "License",
    component: LicensePage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
