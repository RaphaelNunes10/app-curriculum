<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title class="ml-2 text-xs sm:text-sm md:text-2xl"
        >Meus Curricula</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="flex flex-col" :fullscreen="true">
      <ion-header class="flex-0" collapse="condense">
        <ion-toolbar>
          <ion-title size="large" class="ml-2 text-xs sm:text-sm md:text-2xl"
          >Meus Curricula</ion-title>
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
            <ion-card class="z-0 w-auto">
              <ion-card-content class="relative p-2 justify-items-center">
                <div class="absolute right-5 top-5 z-50 grid grid-flow-col sm:grid-flow-row gap-2 justify-items-end">
                  <ion-button
                    shape="round"
                    :router-link="`/edit/${curriculum.id}`"
                    :fill='
                      breakpoints.greaterOrEqual("sm").value
                      ? "solid"
                      : "clear"
                    '
                    class="w-auto sm:w-50 text-xs sm:text-sm md:text-base"
                  >
                    <template
                      v-if='
                        breakpoints.greaterOrEqual("sm")
                        .value
                      '
                    >
                      <span class="hidden sm:block">Editar&nbsp;</span>
                      <ion-icon name="create" />
                    </template>
                    <ion-icon
                      v-else
                      slot="icon-only"
                      name="create"
                      class="text-3xl"
                    />
                  </ion-button>

                  <ion-button
                    shape="round"
                    color="danger"
                    size="small"
                    :fill='
                      breakpoints.greaterOrEqual("sm").value
                      ? "solid"
                      : "clear"
                    '
                    class="sm:w-3/4 text-xs sm:text-sm md:text-base"
                    @click="deleteCurriculum(curriculum.id!)"
                  >
                    <template
                      v-if='
                        breakpoints.greaterOrEqual("sm")
                        .value
                      '
                    >
                      <span class="hidden sm:block"
                      >Excluir&nbsp;</span><ion-icon name="trash" />
                    </template>
                    <ion-icon
                      v-else
                      slot="icon-only"
                      name="trash"
                      class="text-3xl"
                    />
                  </ion-button>
                </div>

                <default-curriculum :dados="curriculum" class="size-full" />
              </ion-card-content>
            </ion-card>
          </swiper-slide>
        </swiper-container>

        <ion-nav-link
          v-if="curricula.length > 0"
          class="fixed left-1/2 transform -translate-x-1/2 md:left-auto md:translate-x-0 md:right-10 bottom-5 z-50"
          router-direction="forward"
          :component="EditPage"
        >
          <ion-button
            shape="round"
            size="large"
            router-link="/create"
            class="w-auto text-xs sm:text-sm md:text-base"
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
import { addCircle, create, trash } from "ionicons/icons";

import { register as registerSwiper } from "swiper/element/bundle";

// import { useDadosCurriculum } from "@/composables/dados-curriculum";
import { useCrudCurriculum } from "@/composables/crud-curriculum";

import { useVueToPrint } from "vue-to-print";

const breakpoints = useBreakpoints({
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  trash: trash,
});

registerSwiper();

const { curricula, fetchCurricula, deleteCurriculum } = useCrudCurriculum();
fetchCurricula();
</script>

<style scoped>
</style>
