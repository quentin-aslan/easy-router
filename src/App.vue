<template>
  <TheHeader />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "@/components/TheHeader.vue";
import {useManageWifi} from "@/composable/use-manage-wifi";
import {useManageNordVpn} from "@/composable/use-manage-nord-vpn";

// Get data from the backend when the app starts
const { getAvailableWifi, getCurrentWifi } = useManageWifi()
const { getVpnStatus } = useManageNordVpn()

getCurrentWifi()
getAvailableWifi()
getVpnStatus()
</script>
