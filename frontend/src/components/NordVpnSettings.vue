<template>
  <div >
    <CardTemplate title="VPN" id="vpn-card">
      <!-- <div class="badge badge-accent badge-outline">{{ vpnStatus?.status ? vpnStatus.status : "Disconnected" }}</div> To do but not here-->
      <span v-if="isConnectVpnLoading || isDisconnectVpnLoading || isGetVpnStatusLoading">
        <span class="loading loading-spinner loading-md"></span>
      </span>
      <div v-else class="flex flex-col gap-3 w-full sm:w-auto">

        <div v-if="isVpnConnected && vpnStatus" class="flex flex-col gap-3">
          <div class="lg:hidden">
            <ul class="text-left flex flex-col gap-1 p-1">
              <li>Status: <span class="underline">{{ vpnStatus.status }}</span></li>
              <li>City: <span class="underline">{{ vpnStatus.city }}</span></li>
              <li>Country: <span class="underline">{{ vpnStatus.country }}</span></li>
              <li>IP: <span class="underline">{{ vpnStatus.ip }}</span></li>
              <li>Hostname: <span class="underline">{{ vpnStatus.hostname }}</span></li>
              <li>UpTime: <span class="underline">{{ vpnStatus.uptime }}</span></li>
              <li>Transfer: <span class="underline">{{ vpnStatus.transfer }}</span></li>
            </ul>
          </div>

          <div class="hidden lg:flex stats shadow">
            <!-- Virtual location -->
            <div class="stat">
              <div class="stat-title">Virtual location</div>
              <div class="stat-value">{{ vpnStatus.country }}</div>
              <div class="stat-desc">{{ vpnStatus.city }}</div>
            </div>
          
            <!-- IP Address -->
            <div class="stat">
              <div class="stat-title">IP Address</div>
              <div class="stat-value">{{ vpnStatus.ip }}</div>
              <div class="stat-desc">{{ vpnStatus.hostname }}</div>
            </div>
          
            <!-- UpTime -->
            <div class="stat">
              <div class="stat-title">UpTime</div>
              <div class="stat-value">{{ vpnStatus?.uptime ? formatUptime(vpnStatus.uptime) : '' }}</div>
              <div class="stat-desc">{{ vpnStatus.transfer }}</div>
            </div>
          </div>
          <span id="nord">Powered by <a class="link link-info" href="https://nordvpn.com" target="_blank">NordVPN&#169</a></span>

          <form class="form-control" @submit.prevent="submitDisconnectForm">
            <button type="submit" class="btn btn-outline btn-error" :disabled="isDisconnectVpnLoading" >
              ⚠️ Disconnect
            </button>
          </form>

        </div>

        <span v-if="isVpnConnected && vpnStatus" class="divider" id="location">🌎 Change location</span>

        <select v-model="selectedCity" class="select select-bordered w-full">
          <option v-for="city in citiesAvailable"
                  :key="city.value"
                  :value="city.value"
          >
            {{ city.label }}
          </option>
        </select>
        <form class="form-control flex" @submit.prevent="submitForm">
          <button type="submit" class="btn btn-neutral" :disabled="isConnectButtonDisabled" >
            Connect
          </button>
        </form>
      </div>
    </CardTemplate>

    <ModalStatus :id="modalIdConnect" :status="modalStatusConnect" :content="modalContentConnect" />
    <ModalStatus :id="modalIdDisconnect" :status="modalStatusDisconnect" :content="modalContentDisconnect" />
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch} from "vue";
import ModalStatus from "../components/ModalStatus.vue";
import {EnumModalStatus} from "../types";
import {useManageNordVpn} from "../composable/use-manage-nord-vpn";
import CardTemplate from "./CardTemplate.vue";

const { vpnStatus, isGetVpnStatusLoading, isVpnConnected, connectVpn, isConnectVpnLoading, isConnectVpnError, disconnectVpn, isDisconnectVpnLoading, isDisconnectVpnError } = useManageNordVpn()
const citiesAvailable = [
  {label: 'Montreal 🇨🇦', value: 'Montreal'},
  {label: 'Toronto 🇨🇦', value: 'Toronto'},
  {label: 'Paris 🇫🇷', value: 'Paris'},
  {label: 'Marseille 🇫🇷', value: 'Marseille'},
  {label: 'New York 🇺🇸', value: 'New_York'},
  {label: 'Bogota 🇨🇴', value: 'Bogota'},
  {label: 'Vancouver 🇨🇦', value: 'Vancouver'}
]

const selectedCity = ref(citiesAvailable[0].value);
watch(() => vpnStatus.value, (newValue) => selectedCity.value = newValue?.city || citiesAvailable[0].value)


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

const formatUptime = (uptime: string) => {
  // Replace "minutes" with "min" and "seconds" with "s"
  return uptime.replace('minutes', 'min').replace('seconds', 's');
};
</script>

<style>
#vpn-card {
  min-height: 440px;
  align-items: baseline;
}

#nord {
  text-align: end;
  font-size: smaller;
}

#location {
  text-align: left !important;
}
</style>