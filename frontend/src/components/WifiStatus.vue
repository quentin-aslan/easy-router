<template>
  <div v-if="!isGetCurrentWifiLoading && !isGetAvailableWifiLoading">
    <div v-if="isWifiConnected" role="alert" class="alert">
      <SuccessIcon class="text-success" />
      <span
        >🛜 Wifi Connected: <b>{{ currentWifi.ssid }}</b></span
      >

      <a class="link" target="_blank" href="http://neverssl.com">If you are on a PUBLIC WIFI, click here to redirect to the login portail</a>
    </div>

    <div v-else role="alert" class="alert alert-warning">
      <WarningIcon />
      <span>Warning: Wifi disconnected</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useManageWifi } from "../composable/use-manage-wifi";
import WarningIcon from "../components/icons/WarningIcon.vue";
import SuccessIcon from "../components/icons/SuccessIcon.vue";

const { currentWifi, isWifiConnected, isGetCurrentWifiLoading, isGetAvailableWifiLoading  } = useManageWifi();
</script>
