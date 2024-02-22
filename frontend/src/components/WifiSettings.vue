<template>
  <div>
    <CardTemplate title="WIFI" id="wifi-card">
    <span v-if="isConnectWifiLoading || isGetCurrentWifiLoading || isGetAvailableWifiLoading">
        <span class="loading loading-spinner loading-md"></span>
      </span>
      <div v-else class="w-full sm:px-24 flex flex-col gap-3">
        <div class="indicator w-full">
          <span class="indicator-item badge badge-secondary badge-lg">{{ availableWifi.length }}</span>
          <select v-model="selectedWifi" class="select select-bordered w-full">
            <option v-if="availableWifi.length === 0 " value="" disabled selected>No WIFI Available</option>
            <option v-else-if="selectedWifi === ''" value="" disabled selected>Select a WIFI network</option>
            <option
                v-for="wifi in availableWifi"
                :key="wifi.ssid"
                :value="wifi.ssid"
            >
              {{ wifi.ssid }} ~ {{ wifi.bars }}
            </option>
          </select>
        </div>

        <form class="form-control flex flex-col gap-5 w-full" @submit.prevent="submitForm">
          <div class="w-full">
            <label class="input input-bordered flex items-center gap-2">
              <PasswordIcon />
              <input :disabled="selectedWifi === ''" v-model="password" type="text" class="grow" placeholder="Wifi Password" />
            </label>
          </div>

          <button type="submit" class="btn btn-neutral" :disabled="isSubmitDisabled" >
            Connect
          </button>
        </form>
      </div>
    </CardTemplate>
    <ModalStatus :id="modalId" :status="modalStatus" :content="modalContent" />
  </div>
</template>

<script setup lang="ts">
import {useManageWifi} from "../composable/use-manage-wifi";
import PasswordIcon from "../components/icons/PasswordIcon.vue";
import {computed, ref, watch} from "vue";
import ModalStatus from "../components/ModalStatus.vue";
import {EnumModalStatus} from "../types";
import CardTemplate from "./CardTemplate.vue";

const { currentWifi, isGetCurrentWifiLoading, availableWifi, isGetAvailableWifiLoading, connectWifi, isConnectWifiLoading, isConnectWifiError } = useManageWifi();
const selectedWifi = ref('')
watch(() => currentWifi.value, (newValue) => selectedWifi.value = newValue?.ssid || '')

const password = ref('');

const isSubmitDisabled = computed(() => (selectedWifi.value === '' ||  isConnectWifiLoading.value))

const modalId = 'wifi-available-modal';
const modalStatus = computed(() => (isConnectWifiError.value) ? EnumModalStatus.ERROR : EnumModalStatus.SUCCESS);
const modalContent = computed(() => (modalStatus.value === EnumModalStatus.ERROR) ? 'Error while connecting to the wifi' : 'Wifi connected successfully');

const submitForm = async () => {
  if (password.value === '') {
    if (!confirm('Are you sure you want to connect to the wifi without a password?')) {
      return;
    }
  }
  await connectWifi(selectedWifi.value, password.value);
  (document.getElementById(modalId) as HTMLDialogElement).showModal()
};
</script>

<style>
#wifi-card {
  min-height: 264px;
  align-items: baseline;
}
</style>