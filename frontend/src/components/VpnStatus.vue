<template>
  <div v-if="isVpnConnected && vpnStatus" role="alert" class="alert alert-success">
    <SuccessIcon />
    <span
      >🔐 VPN Connected: <b> {{ vpnStatus.city }}, {{ vpnStatus.country }}, {{ vpnStatus.ip }} </b></span
    >
    <a class="link" target="_blank" href="https://nordvpn.com/fr/what-is-my-ip/">Click here to double check on the web</a>
  </div>

  <div v-else role="alert" class="alert alert-warning">
    <WarningIcon />
    <span>Warning: VPN disconnected</span>
  </div>
</template>

<script setup lang="ts">
import WarningIcon from "../components/icons/WarningIcon.vue";
import SuccessIcon from "../components/icons/SuccessIcon.vue";
import {useManageNordVpn} from "../composable/use-manage-nord-vpn";

const { vpnStatus, isVpnConnected } = useManageNordVpn();
</script>
