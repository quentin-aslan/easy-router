<template>
  <main class="flex flex-col gap-5 mr-10 ml-10">
    <WifiStatus class="flex-1" />
    <VpnStatus class="flex-1" />

    <div class="lg:flex lg:flex-row ">
      <WifiAvailable class="flex-1" />
    </div>
  </main>
</template>

<script setup lang="ts">
import WifiStatus from "@/components/WifiStatus.vue";
import WifiAvailable from "@/components/WifiAvailable.vue";
import VpnStatus from "@/components/VpnStatus.vue";
</script>
