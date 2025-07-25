<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>
          Licença
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="flex flex-col" :fullscreen="true">
      <ion-header class="flex-0" collapse="condense">
        <ion-toolbar>
          <ion-title>
            Licença
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <div
        id="container prose"
        class="flex-0 relative container mx-auto p-6"
      >
        <LicenseText />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import LicenseText from "../assets/markdown/license.md";

import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
</script>
