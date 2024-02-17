<template>
  <TheHeader />
  <RouterView />
  <TheBottomNavigation />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "@/components/TheHeader.vue";
import TheBottomNavigation from "@/components/TheBottomNavigation.vue";
</script>
