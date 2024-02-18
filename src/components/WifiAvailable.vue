<template>
  <div class="card bg-neutral text-neutral-content flex flex-row items-center">
    <div class="card-body items-center text-center gap-5 p-5">
      <h1 class="text-xl">WIFI Available</h1>

      <div class="indicator w-full">
        <span class="indicator-item badge badge-primary badge-lg">{{ wifiAvailable.length }}</span>
        <select class="select select-bordered w-full">
          <option v-for="wifi in wifiAvailable" :key="wifi.ssid" :value="wifi.ssid" :selected="wifi.ssid === currentWifi.ssid">{{ wifi.ssid }} ~ {{ wifi.bars }}</option>
        </select>
      </div>


      <form class="form-control flex flex-col gap-5 w-full">

        <div class="w-full">
          <label class="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" /></svg>
            <input type="text" class="grow" placeholder="Wifi Password" />
          </label>
        </div>

        <button type="submit" class="btn btn-primary">Connect</button>
      </form>

    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, type Ref, ref} from "vue";

type Wifi = {
  ssid: string,
  bars: number
}

const mockWifiStatus: Wifi[] = [
  {
    ssid: 'MyWi22fi',
    bars: 3
  },
  {
    ssid: 'MyWifi2',
    bars: 2
  },
  {
    ssid: 'MyWifi3',
    bars: 1
  },{
    ssid: 'Current Wifi',
    bars: 3
  }]

// TODO: utiliser un composable pour partager les informations entre components ? Ou alors afficher Wifi available et Wifi status dans le meme block >?
const currentWifi = ref({
  ssid: 'Current Wifi',
  bars: 3
})

const wifiAvailable = computed(() => {
  return (mockWifiStatus) ? mockWifiStatus : []
})


</script>
