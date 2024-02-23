<template>
  <TheHeader />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "./components/TheHeader.vue";
import {useManageWifi} from "./composable/use-manage-wifi";
import {useManageNordVpn} from "./composable/use-manage-nord-vpn";
import {useManageHotspot} from "./composable/use-manage-hotspot";

// Get data from the backend when the app starts
const { getAvailableWifi, getCurrentWifi } = useManageWifi()
const { getVpnStatus } = useManageNordVpn()
const { getConnectedDevices } = useManageHotspot()

getCurrentWifi()
getAvailableWifi()
getVpnStatus()
getConnectedDevices()
</script>
