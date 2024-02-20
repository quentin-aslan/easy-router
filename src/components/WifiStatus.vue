<template>
  <div v-if="currentWifi" role="alert" class="alert alert-success">
    <SuccessIcon />
    <span
      >🛜 Wifi Connected: <b>{{ currentWifi.ssid }}</b></span
    >
  </div>

  <div v-else role="alert" class="alert alert-warning">
    <WarningIcon />
    <span>Warning: Wifi disconnected</span>
  </div>
</template>

<script setup lang="ts">
import { useManageWifi } from "@/composable/use-manage-wifi";
import WarningIcon from "@/components/icons/WarningIcon.vue";
import SuccessIcon from "@/components/icons/SuccessIcon.vue";

const { currentWifi } = useManageWifi();
</script>
