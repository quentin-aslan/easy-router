<template>
  <button @click="refresh" class="btn btn-outline btn-accent">Refresh WIFI & VPN Datas</button>
</template>

<script setup lang="ts">
import { useManageWifi } from "../composable/use-manage-wifi";
import {useManageNordVpn} from "../composable/use-manage-nord-vpn";
const { getCurrentWifi, getAvailableWifi } = useManageWifi();
const { getVpnStatus } = useManageNordVpn();

const refresh = () => {
  getCurrentWifi();
  getAvailableWifi();
  getVpnStatus();
}

</script>