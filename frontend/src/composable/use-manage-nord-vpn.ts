import {computed, type Ref} from "vue";
import {ref} from "vue";
import {type VpnStatus, VpnStatusEnum} from "../types";
import {fetchVpnConnect, fetchVpnDisconnect, fetchVpnStatus} from "../api";

// Variable accessible from the different instances of the composable
const vpnStatus: Ref<VpnStatus | undefined> = ref(undefined);
const isVpnConnected = computed(() => vpnStatus.value?.status === VpnStatusEnum.CONNECTED);
const isGetVpnStatusLoading = ref(false);

export const useManageNordVpn = () => {
  // All variable created here will be private to the instance of the composable

  const isDisconnectVpnError = ref(false);
  const isDisconnectVpnLoading = ref(false);

  const isConnectVpnError = ref(false);
  const isConnectVpnLoading = ref(false);

  const getVpnStatus = async () => {
    try {
      isGetVpnStatusLoading.value = true;
      vpnStatus.value = undefined

      vpnStatus.value = await fetchVpnStatus();
    } catch (e) {
      console.error(e);
    } finally {
        isGetVpnStatusLoading.value = false;
    }
  };

  const connectVpn = async (city: string) => {
    try {
      isConnectVpnError.value = false;
      isConnectVpnLoading.value = true;

      const response = await fetchVpnConnect(city)
      if (!response.success) isConnectVpnError.value = true;
      await getVpnStatus();

    } catch (e) {
      console.error(e);
      isConnectVpnError.value = true;
    } finally {
        isConnectVpnLoading.value = false;
    }
  }

  const disconnectVpn = async () => {
    try {
      isDisconnectVpnError.value = false;
      isDisconnectVpnLoading.value = true;

      const response = await fetchVpnDisconnect();
      if (!response.success) isDisconnectVpnError.value = true;
      await getVpnStatus();

    } catch (e) {
      console.error(e);
      isDisconnectVpnError.value = true;
    } finally {
        isDisconnectVpnLoading.value = false;
    }
  }

  return {
    vpnStatus,
    isGetVpnStatusLoading,
    isVpnConnected,
    getVpnStatus,
    connectVpn,
    isConnectVpnError,
    isConnectVpnLoading,
    disconnectVpn,
    isDisconnectVpnError,
    isDisconnectVpnLoading,
  };
};
