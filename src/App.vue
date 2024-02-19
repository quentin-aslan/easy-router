<template>
  <TheHeader />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "@/components/TheHeader.vue";
import {useManageWifi} from "@/composable/use-manage-wifi";

// Get data from the backend when the app starts
const { getAvailableWifi, getCurrentWifi } = useManageWifi()

getCurrentWifi()
getAvailableWifi()
</script>
