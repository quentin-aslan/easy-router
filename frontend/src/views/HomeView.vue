<template>
  <main class="flex flex-col gap-5 mr-10 ml-10">
    <WifiStatus class="flex-1" />
    <VpnStatus  class="flex-1" />

    <div class="flex flex-col lg:flex-row gap-5">
      <WifiSettings class="flex-1" />
      <NordVpnSettings class="flex-1" />
    </div>

    <RefreshButton v-if="isPWA()" />
  </main>
</template>

<script setup lang="ts">
import WifiStatus from "../components/WifiStatus.vue";
import WifiSettings from "../components/WifiSettings.vue";
import VpnStatus from "../components/VpnStatus.vue";
import NordVpnSettings from "../components/NordVpnSettings.vue";
import RefreshButton from "../components/RefreshButton.vue";
import {isPWA} from "../utils";
</script>
