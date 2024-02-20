import { ref } from "vue";
import type { Ref } from "vue";
import {fetchAvailableWifi, fetchCurrentWifi, fetchWifiConnect} from "../api";
import type {AvailableWifi, CurrentWifi} from "../types";

// Variable accessible from the different instances of the composable
const currentWifi: Ref<CurrentWifi | undefined> = ref(undefined);
const availableWifi: Ref<AvailableWifi[]> = ref([]);

export const useManageWifi = () => {
  // All variable created here will be private to the instance of the composable
  const isConnectWifiError = ref(false);
  const isConnectWifiLoading = ref(false);

  const getCurrentWifi = async () => {
    try {
      currentWifi.value = await fetchCurrentWifi()
    } catch (e) {
      console.error(e);
      currentWifi.value = undefined;
    }
  };

  const getAvailableWifi = async () => {
    try {
      availableWifi.value = await fetchAvailableWifi()
    } catch (e) {
      console.error(e);
      availableWifi.value = []
    }
  };

  const connectWifi = async (ssid: string, password: string) => {
    try {
      isConnectWifiError.value = false;
      isConnectWifiLoading.value = true;

      const response = await fetchWifiConnect(ssid, password);
      if (response.success) await getCurrentWifi();
      else isConnectWifiError.value = true;

    } catch (e) {
      console.error(e);
      isConnectWifiError.value = true;
    } finally {
        isConnectWifiLoading.value = false;
    }
  };

  return {
    currentWifi,
    availableWifi,
    isConnectWifiLoading,
    isConnectWifiError,
    getCurrentWifi,
    getAvailableWifi,
    connectWifi
  };
};
