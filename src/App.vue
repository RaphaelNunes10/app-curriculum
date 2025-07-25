<template>
  <ion-app>
    <DefaultLayout>
      <ion-router-outlet :key="$route.fullPath" />
    </DefaultLayout>
  </ion-app>
</template>

<script setup lang="ts">
import "./assets/styles/main.css";

import DefaultLayout from "./layouts/DefaultLayout.vue";
import { IonApp, IonRouterOutlet } from "@ionic/vue";
</script>
