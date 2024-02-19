<template>
  <div class="card bg-neutral text-neutral-content flex flex-row items-center">
    <div class="card-body items-center text-center gap-5 p-5">
      <h1 class="text-xl">WIFI Available</h1>

      <span v-if="isConnectWifiLoading">
        <span class="loading loading-bars loading-lg"></span>
      </span>

      <div v-else class="w-full">
        <div class="indicator w-full">
        <span class="indicator-item badge badge-primary badge-lg">{{
            availableWifi.length
          }}</span>
          <select v-model="selectedWifi" class="select select-bordered w-full">
            <option v-if="selectedWifi.length === 0" value="" disabled selected>No WIFI Available</option>
            <option v-else
                    v-for="wifi in availableWifi"
                    :key="wifi.ssid"
                    :value="wifi.ssid"
                    :selected="wifi.ssid === currentWifi?.ssid"
            >
              {{ wifi.ssid }} ~ {{ wifi.bars }}
            </option>
          </select>
        </div>

        <form v-if="selectedWifi !== ''" class="form-control flex flex-col gap-5 w-full" @submit.prevent="submitForm">
          <div class="w-full">
            <label class="input input-bordered flex items-center gap-2">
              <PasswordIcon />
              <input v-model="password" type="text" class="grow" placeholder="Wifi Password" />
            </label>
          </div>

          <button type="submit" class="btn btn-primary" :disabled="isPasswordDisabled" >
            Connect
          </button>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useManageWifi } from "@/composable/use-manage-wifi";
import PasswordIcon from "@/components/icons/PasswordIcon.vue";
import {computed, ref} from "vue";

const { currentWifi, availableWifi, connectWifi, isConnectWifiLoading } = useManageWifi();
const selectedWifi = ref('');
const password = ref('');

const isPasswordDisabled = computed(() => (selectedWifi.value === '' || password.value.length === 0 || isConnectWifiLoading.value))

const submitForm = (event: Event) => {
  connectWifi(selectedWifi.value, password.value);
};
</script>
