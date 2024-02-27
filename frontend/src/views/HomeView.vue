<template>
  <main class="flex flex-col gap-5 mr-10 mb-10 ml-10">
    <WifiStatus class="flex-1" />
    <VpnStatus  class="flex-1" />

    <div role="tablist" class="tabs tabs-lifted">
      <input type="radio" name="menu_tabs" role="tab" class="tab" aria-label="Dashboard" />
      <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <!-- Desktop View -->
        <div class="hidden lg:block">
          <div class="flex flex-row gap-5">
            <div class="flex-1 flex flex-col gap-5">
              <WifiSettings class="flex-1" />
              <HotspotConnectedDevices class="flex-1" />
            </div>

            <div class="flex-1 flex flex-col gap-5">
              <NordVpnSettings class="flex-1" />
            </div>
          </div>
        </div>


        <!-- Mobile view -->
        <div class="lg:hidden">
          <div class="flex flex-col lg:flex-row gap-5">
            <WifiSettings class="flex-1" />
            <NordVpnSettings class="flex-1" />
          </div>

          <HotspotConnectedDevices class="flex-1" />
        </div>
      </div>

      <input type="radio" name="menu_tabs" role="tab" class="tab" aria-label="AP / Hotspot settings" checked/>
      <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <div class="flex flex-row gap-5">
          <HotspotSettings class="flex-1" />
          <div class="flex-1"></div>
        </div>
      </div>
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
import HotspotConnectedDevices from "../components/HotspotConnectedDevices.vue";
import HotspotSettings from "../components/HotspotSettings.vue";
</script>
