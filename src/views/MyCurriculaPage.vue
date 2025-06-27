<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title class="ml-2">Meus Curricula</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="flex flex-col" :fullscreen="true">
      <ion-header class="flex-0" collapse="condense">
        <ion-toolbar>
          <ion-title size="large" class="ml-2">Meus Curricula</ion-title>
        </ion-toolbar>
      </ion-header>

      <div
        id="container"
        class="flex-0 relative h-full"
      >
        <div v-if="curricula.length == 0" class="justify-items-center">
          <h2>
            Adicione um curriculum para iniciar!
          </h2>
          <br>
          <ion-button shape="round" size="large" router-link="/edit">Adicionar
            Curriculum&nbsp;<ion-icon name="add-circle" /></ion-button>
        </div>
        <swiper-container
          v-else
          slides-per-view="1"
          navigation="true"
          pagination="true"
          scrollbar="true"
          css-mode="true"
        >
          <swiper-slide
            v-for="curriculum in curricula"
            :key="curriculum.id"
            class="p-4 justify-items-center"
          >
            <ion-card class="z-0">
              <ion-card-content class="relative p-2 justify-items-center">
                <ion-button
                  class="absolute right-5 top-5 z-50"
                  shape="round"
                  :router-link="`/edit/${curriculum.id}`"
                ><span class="mt-1.5">Editar</span>&nbsp;<ion-icon
                    name="create"
                  /></ion-button>

                <default-curriculum :dados="curriculum" />
              </ion-card-content>
            </ion-card>
          </swiper-slide>
        </swiper-container>

        <ion-nav-link
          v-if="curricula.length > 0"
          class="fixed right-10 bottom-5 z-50"
          router-direction="forward"
          :component="EditPage"
        >
          <ion-button
            shape="round"
            size="large"
            router-link="/create"
          >Adicionar Curriculum&nbsp;<ion-icon name="add-circle" /></ion-button>
        </ion-nav-link>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useBreakpoints } from "@vueuse/core";

import EditPage from "./EditPage.vue";

import DefaultCurriculum from "../components/default-curriculum.vue";

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonNavLink,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";

import Swiper from "swiper";
import "swiper/css";

import { addIcons } from "ionicons";
import { addCircle, create } from "ionicons/icons";

import { register as registerSwiper } from "swiper/element/bundle";

// import { useDadosCurriculum } from "@/composables/dados-curriculum";
import { useCrudCurriculum } from "@/composables/crud-curriculum";

const breakpoints = useBreakpoints({
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
});

const swiper = new Swiper(".swiper", {
  direction: "vertical",
  loop: true,

  pagination: {
    el: ".swiper-pagination",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

addIcons({
  "add-circle": addCircle,
  create: create,
});

registerSwiper();

const { curricula, fetchCurricula } = useCrudCurriculum();
fetchCurricula();
</script>

<style scoped>
</style>
