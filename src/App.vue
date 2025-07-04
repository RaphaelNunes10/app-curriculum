<template>
  <div class="prose dark:prose-invert w-full">
    <ion-app>
      <ion-router-outlet :key="$route.fullPath" />
    </ion-app>
  </div>
</template>

<script setup lang="ts">
import "./assets/styles/main.css";
import { IonApp, IonRouterOutlet } from "@ionic/vue";
</script>
