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
          <ion-title class="ml-2">Meus Curricula</ion-title>
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
          ref="swiper"
          slides-per-view="1"
          navigation="true"
          pagination="true"
          scrollbar="true"
          css-mode="true"
          @swiperslidechange="onSlideChange"
        >
          <swiper-slide
            v-for="(curriculum, index) in curricula"
            :key="curriculum.id"
            class="p-4 justify-items-center"
          >
            <ion-card class="z-0 w-auto">
              <ion-card-content class="relative p-2 justify-items-center">
                <div class="absolute right-5 top-5 z-50 grid grid-cols-12 sm:grid-flow-row sm:auto-rows-auto gap-2 justify-items-end">
                  <ion-button
                    shape="round"
                    color="warning"
                    size="small"
                    :fill='
                      breakpoints.greaterOrEqual("sm").value
                      ? "solid"
                      : "clear"
                    '
                    class="w-auto sm:w-50 text-xs sm:text-sm md:text-base order-last sm:order-none col-span-6 col-start-7 sm:col-span-12 sm:col-start-auto mt-2 sm:mt-0"
                    @click="handlePrint()"
                  >
                    <template
                      v-if='
                        breakpoints.greaterOrEqual("sm")
                        .value
                      '
                    >
                      <span class="hidden sm:block"
                      >Imprimir&nbsp;</span><ion-icon name="print" />
                    </template>
                    <ion-icon
                      v-else
                      slot="icon-only"
                      name="print"
                      class="text-3xl drop-shadow-xl"
                    />
                  </ion-button>

                  <ion-button
                    shape="round"
                    :router-link="`/edit/${curriculum.id}`"
                    :fill='
                      breakpoints.greaterOrEqual("sm").value
                      ? "solid"
                      : "clear"
                    '
                    class="sm:w-3/4 text-xs sm:text-sm md:text-base col-span-4 col-start-6 sm:col-span-12"
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
                      class="text-3xl drop-shadow-xl"
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
                    class="sm:w-1/2 text-xs col-span-3 sm:col-span-12"
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
                      class="text-2xl drop-shadow-xl"
                    />
                  </ion-button>
                </div>

                <default-curriculum
                  :ref="(el) => setComponentRef(el, index)"
                  :dados="curriculum"
                  class="size-full"
                />
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
          >Adicionar Curriculum&nbsp;<ion-icon
              name="add-circle"
              class="text-3xl"
            /></ion-button>
        </ion-nav-link>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { TemplateRef } from "vue";

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

import { addIcons } from "ionicons";
import { addCircle, create, print, trash } from "ionicons/icons";

import Swiper from "swiper";
import "swiper/css";

import { register as registerSwiper } from "swiper/element/bundle";

import EditPage from "./EditPage.vue";

import DefaultCurriculum from "../components/default-curriculum.vue";

import { useCrudCurriculum } from "@/composables/crud-curriculum";

import { useBreakpoints } from "@vueuse/core";

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
  print: print,
});

registerSwiper();

const { curricula, fetchCurricula, deleteCurriculum } = useCrudCurriculum();
fetchCurricula();

const activeIndex = ref(0);
const componentRefs = ref<(InstanceType<typeof DefaultCurriculum> | null)[]>(
  [],
);

// TODO: Finalizar impressão

const setComponentRef = (
  el: InstanceType<typeof DefaultCurriculum> | null,
  index: number,
) => {
  componentRefs.value[index] = el;
};

const onSlideChange = (event: Event) => {
  const swiperEl = event.target as any;

  activeIndex.value = swiperEl.swiper.activeIndex;
};

const activeComponent = computed<InstanceType<typeof DefaultCurriculum> | null>(
  () => componentRefs.value[activeIndex.value] || null,
);

const { handlePrint } = useVueToPrint({
  content: activeComponent.value!,
  documentTitle: "AwesomeFileName",
});
</script>

<style scoped>
</style>
