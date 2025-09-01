<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar class="px-3">
        <ion-title>Meus Currículos</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="flex flex-col" :fullscreen="true">
      <ion-header class="flex-0" collapse="condense">
        <ion-toolbar class="px-3">
          <ion-title>Meus Currículos</ion-title>
        </ion-toolbar>
      </ion-header>

      <div
        id="container"
        class="flex-0 relative h-full"
      >
        <ion-nav-link
          class="fixed left-1/2 transform -translate-x-1/2 md:left-auto md:translate-x-0 md:right-10 bottom-5 md:bottom-auto md:top-20 z-50"
          router-direction="forward"
          :component="EditPage"
        >
          <ion-button
            shape="round"
            size="small"
            fill="clear"
            router-link="/about"
            class="w-auto text-[0.6rem] md:text-xs"
          >Sobre&nbsp;<ion-icon
              name="information-circle-outline"
              class="text-xl md:text-2xl"
            /></ion-button>
        </ion-nav-link>

        <div
          v-if="curricula.length == 0"
          class="grid justify-items-center gap-4"
        >
          <h2>
            Adicione um currículo para iniciar!
          </h2>

          <ion-button shape="round" size="large" router-link="/create">Adicionar
            currículo&nbsp;<ion-icon name="add-circle" /></ion-button>
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
            v-for="(curriculum, index) in curricula"
            :key="curriculum.id"
            class="p-4 grid justify-items-center"
            ref="curricula-to-print"
          >
            <ion-card class="z-0 w-auto">
              <ion-card-content class="relative p-2 grid justify-items-center">
                <div
                  v-if='
                    breakpoints.smallerOrEqual(
                      "sm",
                    )
                      .value
                  '
                  class="
                    absolute top-0 right-0 w-full h-full pointer-events-none
                    [background-image:linear-gradient(-135deg,rgba(0,0,0,0.5)_0%,transparent_20%)]
                  "
                >
                </div>

                <div class="absolute right-5 top-5 z-50 grid grid-cols-12 sm:grid-flow-row sm:auto-rows-auto gap-2 justify-items-end">
                  <ion-button
                    shape="round"
                    color="yellow"
                    size="small"
                    :fill='
                      breakpoints.greaterOrEqual("sm")
                        .value
                      ? "solid"
                      : "clear"
                    '
                    class="w-auto sm:w-50 text-xs sm:text-sm md:text-base order-last sm:order-none col-span-6 col-start-7 sm:col-span-12 sm:col-start-auto mt-2 sm:mt-0"
                    @click='
                      printComponent(
                        index,
                        `${
                          (curriculum.nome.text as string)
                            .replace(" ", "-")
                            .toLowerCase()
                        }-${
                          (curriculum.sobrenome
                            .text as string).replace(
                              " ",
                              "-",
                            ).toLowerCase()
                        }-curriculum`,
                      )
                    '
                  >
                    <template
                      v-if='
                        breakpoints.greaterOrEqual(
                          "sm",
                        )
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
                      class="text-3xl [filter:drop-shadow(4px_0_0_rgba(0,0,0,0.3))drop-shadow(4px_2px_0_rgba(0,0,0,0.3))]"
                    />
                  </ion-button>

                  <ion-button
                    shape="round"
                    :router-link="`/edit/${curriculum.id}`"
                    size="small"
                    :fill='
                      breakpoints.greaterOrEqual("sm")
                        .value
                      ? "solid"
                      : "clear"
                    '
                    class="sm:w-3/4 text-xs sm:text-sm md:text-base col-span-4 col-start-6 sm:col-span-12"
                  >
                    <template
                      v-if='
                        breakpoints.greaterOrEqual(
                          "sm",
                        )
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
                      class="text-3xl [filter:drop-shadow(4px_0_0_rgba(0,0,0,0.3))drop-shadow(4px_2px_0_rgba(0,0,0,0.3))]"
                    />
                  </ion-button>

                  <ion-button
                    shape="round"
                    color="danger"
                    size="small"
                    :fill='
                      breakpoints.greaterOrEqual("sm")
                        .value
                      ? "solid"
                      : "clear"
                    '
                    class="sm:w-3/5 text-xs col-span-3 sm:col-span-12"
                    @click="deleteCurriculum(curriculum.id!)"
                  >
                    <template
                      v-if='
                        breakpoints.greaterOrEqual(
                          "sm",
                        )
                          .value
                      '
                    >
                      <span class="hidden sm:block">Excluir&nbsp;</span>

                      <ion-icon name="trash" />
                    </template>

                    <ion-icon
                      v-else
                      slot="icon-only"
                      name="trash"
                      class="text-2xl [filter:drop-shadow(4px_0_0_rgba(0,0,0,0.3))drop-shadow(4px_2px_0_rgba(0,0,0,0.3))]"
                    />
                  </ion-button>
                </div>

                <div :ref="(el) => registerRef(el, index)" class="size-full">
                  <default-curriculum
                    :dados="curriculum"
                    class="size-full"
                  />
                </div>
              </ion-card-content>
            </ion-card>
          </swiper-slide>
        </swiper-container>

        <ion-nav-link
          v-if="curricula.length > 0"
          class="fixed left-1/2 transform -translate-x-1/2 md:left-auto md:translate-x-0 md:right-10 bottom-16 md:bottom-5 z-50"
          router-direction="forward"
          :component="EditPage"
        >
          <ion-button
            shape="round"
            size="large"
            router-link="/create"
            class="w-auto text-[0.8rem] sm:text-sm md:text-base"
          >Novo Currículo&nbsp;<ion-icon
              name="add-circle"
              class="text-3xl"
            />
          </ion-button>
        </ion-nav-link>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ComponentPublicInstance, Ref } from "vue";

import EditPage from "./EditPage.vue";

import DefaultCurriculum from "../components/default-curriculum.vue";

import { Capacitor } from "@capacitor/core";

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
import {
  addCircle,
  create,
  informationCircleOutline,
  print,
  trash,
} from "ionicons/icons";

import Swiper from "swiper";
import "swiper/css";

import { register as registerSwiper } from "swiper/element/bundle";

import { useCrudCurriculum } from "@/composables/crud-curriculum";

import { useBreakpoints } from "@vueuse/core";

import { useVueToPrint } from "vue-to-print";
import { Printer } from "@bcyesil/capacitor-plugin-printer";

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
  "information-circle-outline": informationCircleOutline,
});

registerSwiper();

const { curricula, fetchCurricula, deleteCurriculum } = useCrudCurriculum();
fetchCurricula();

const componentRefs = ref<HTMLElement[]>([]);

const registerRef = (
  el: Element | ComponentPublicInstance | null,
  index: number,
) => {
  if (el && el instanceof HTMLElement) {
    componentRefs.value[index] = el;
  } else if (el && "$el" in el && el.$el instanceof HTMLElement) {
    componentRefs.value[index] = el.$el;
  }
};

const selectedRef = ref<HTMLElement>() as Ref<HTMLElement>;

const printComponentNative = (html: string, documentTitle: string) => {
  Printer.print({
    content: html,
    name: documentTitle,
    orientation: "portrait",
  });
};

const printComponentWeb = (
  element: Ref<HTMLElement, HTMLElement>,
  documentTitle: string,
) => {
  const { handlePrint } = useVueToPrint({
    content: element,
    documentTitle,
  });

  handlePrint();
};

const printComponent = (index: number, documentTitle: string) => {
  selectedRef.value = componentRefs.value[index];

  const htmlStringToPrint = selectedRef.value?.innerHTML || "";

  if (Capacitor.isNativePlatform()) {
    printComponentNative(htmlStringToPrint, documentTitle);
  } else {
    printComponentWeb(selectedRef, documentTitle);
  }
};
</script>

<style scoped>
</style>
