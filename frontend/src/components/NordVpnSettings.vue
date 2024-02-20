<template>
  <div class="card bg-neutral text-neutral-content flex flex-row items-center">
    <div class="card-body items-center text-center gap-5 p-5">
      <h1 class="text-xl">NordVPN Settings</h1>

      <span v-if="isConnectVpnLoading || isDisconnectVpnLoading">
        <span class="loading loading-bars loading-lg"></span>
      </span>

      <div v-else class="w-full flex flex-col gap-3">

        <div v-if="isVpnConnected && vpnStatus" class="flex flex-col gap-3">

          <ul class="text-left flex flex-col gap-1 p-1">
            <li>Status: <span class="underline">{{ vpnStatus.status }}</span></li>
            <li>City: <span class="underline">{{ vpnStatus.city }}</span></li>
            <li>Country: <span class="underline">{{ vpnStatus.country }}</span></li>
            <li>IP: <span class="underline">{{ vpnStatus.ip }}</span></li>
            <li>Hostname: <span class="underline">{{ vpnStatus.hostname }}</span></li>
            <li>UpTime: <span class="underline">{{ vpnStatus.uptime }}</span></li>
            <li>Transfer: <span class="underline">{{ vpnStatus.transfer }}</span></li>
          </ul>

          <form class="form-control flex flex-col gap-5 w-full" @submit.prevent="submitDisconnectForm">
            <button type="submit" class="btn text-error" :disabled="isDisconnectVpnLoading" >
              ⚠️ Disconnect ⚠️
            </button>
          </form>

        </div>

        <span v-if="isVpnConnected && vpnStatus" class="divider text-neutral-content">⬇️ Connect to a city ⬇️</span>

        <select v-model="selectedCity" class="select select-bordered w-full">
            <option v-for="city in citiesAvailable"
                    :key="city.value"
                    :value="city.value"
            >
              {{ city.label }}
            </option>
          </select>
        <form class="form-control flex flex-col gap-5 w-full" @submit.prevent="submitForm">
            <button type="submit" class="btn btn-primary" :disabled="isConnectButtonDisabled" >
              Connect
            </button>
          </form>
      </div>

    </div>
    <ModalStatus :id="modalIdConnect" :status="modalStatusConnect" :content="modalContentConnect" />
    <ModalStatus :id="modalIdDisconnect" :status="modalStatusDisconnect" :content="modalContentDisconnect" />
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch} from "vue";
import ModalStatus from "../components/ModalStatus.vue";
import {EnumModalStatus} from "../types";
import {useManageNordVpn} from "../composable/use-manage-nord-vpn";

const { vpnStatus, isVpnConnected, connectVpn, isConnectVpnLoading, isConnectVpnError, disconnectVpn, isDisconnectVpnLoading, isDisconnectVpnError } = useManageNordVpn()
const citiesAvailable = [
  {label: 'Montreal 🇨🇦', value: 'Montreal'},
  {label: 'Toronto 🇨🇦', value: 'Toronto'},
  {label: 'Paris 🇫🇷', value: 'Paris'},
  {label: 'Marseille 🇫🇷', value: 'Marseille'},
  {label: 'New York 🇺🇸', value: 'New_York'},
  {label: 'Bogota 🇨🇴', value: 'Bogota'},
  {label: 'Vancouver 🇨🇦', value: 'Vancouver'}
]

const selectedCity = ref('');
watch(() => vpnStatus.value, (newValue) => selectedCity.value = newValue?.city || '')


const isConnectButtonDisabled = computed(() => (selectedCity.value === '' || isConnectVpnLoading.value))

const modalIdConnect = 'nord-vpn-connect-modal';
const modalStatusConnect = computed(() => (isConnectVpnError.value) ? EnumModalStatus.ERROR : EnumModalStatus.SUCCESS);
const modalContentConnect = computed(() => (modalStatusConnect.value === EnumModalStatus.ERROR) ? 'Error while connecting to the VPN' : 'VPN connected successfully');

const modalIdDisconnect = 'nord-vpn-disconnect-modal';
const modalStatusDisconnect = computed(() => (isDisconnectVpnError.value) ? EnumModalStatus.ERROR : EnumModalStatus.SUCCESS);
const modalContentDisconnect = computed(() => (modalStatusDisconnect.value === EnumModalStatus.ERROR) ? 'Error while disconnecting of the VPN' : 'VPN disconnected successfully');

const submitForm = async () => {
  await connectVpn(selectedCity.value);
  (document.getElementById(modalIdConnect) as HTMLDialogElement).showModal()
};

const submitDisconnectForm = async () => {
  await disconnectVpn();
  (document.getElementById(modalIdDisconnect) as HTMLDialogElement).showModal()
};
</script>
