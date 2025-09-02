<template>
  <ion-page>
    <ion-content>
      <div class="prose dark:prose-invert w-full">
        <slot />
      </div>
    </ion-content>
    <ion-footer>
      <ion-toolbar class="pl-3 sm:px-4">
        <ion-title class="text-[0.6rem] sm:text-sm">© 2025{{
            new Date().getFullYear() == 2025
            ? ""
            : `- ${new Date().getFullYear()}`
          }} Raphael Nunes dos Santos.
          <ion-label
            router-link="/license-info"
            class="underline cursor-pointer"
          >
            Licensed under MPL 2.0.
          </ion-label>
        </ion-title>
        <ion-buttons slot="end">
          <a
            v-if='
              breakpoints.greaterOrEqual(
                "sm",
              )
                .value
            '
            href="https://github.com/RaphaelNunes10/app-curriculum"
            class="text-sm text-white! underline"
          ><span>github.com/RaphaelNunes10/app-curriculum</span>
          </a>
          <ion-button
            v-else
            shape="round"
            size="small"
            fill="clear"
            class="sm:w-3/5 text-xs col-span-3 sm:col-span-12"
            @click='
              Browser.open({
                url:
                  "https://github.com/RaphaelNunes10/app-curriculum",
              })
            '
          >
            <ion-icon
              slot="icon-only"
              name="logo-github"
              class="text-2xl text-white!"
            />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";

import { Browser } from "@capacitor/browser";

import { useBreakpoints } from "@vueuse/core";

import { addIcons } from "ionicons";
import { logoGithub } from "ionicons/icons";

const breakpoints = useBreakpoints({
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
});

addIcons({
  "logo-github": logoGithub,
});
</script>
