import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import MyCurriculaPage from "@/views/MyCurriculaPage.vue";
import EditPage from "@/views/EditPage.vue";

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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
