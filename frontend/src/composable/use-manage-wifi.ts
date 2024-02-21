import {computed, ref} from "vue";
import type { Ref } from "vue";
import {fetchAvailableWifi, fetchCurrentWifi, fetchWifiConnect} from "../api";
import type {AvailableWifi, CurrentWifi} from "../types";

// Variable accessible from the different instances of the composable
const currentWifi: Ref<CurrentWifi | undefined> = ref(undefined);
const availableWifi: Ref<AvailableWifi[]> = ref([]);
const isGetCurrentWifiLoading = ref(false);
const isGetAvailableWifiLoading = ref(false);
const isWifiConnected = computed(() => currentWifi.value?.ssid);

export const useManageWifi = () => {
  // All variable created here will be private to the instance of the composable
  const isConnectWifiError = ref(false);
  const isConnectWifiLoading = ref(false);

  const getCurrentWifi = async () => {
    try {
      isGetCurrentWifiLoading.value = true
      currentWifi.value = await fetchCurrentWifi()
    } catch (e) {
      console.error(e)
      currentWifi.value = undefined
    } finally {
        isGetCurrentWifiLoading.value = false
    }
  };

  const getAvailableWifi = async () => {
    try {
      isGetAvailableWifiLoading.value = true
      availableWifi.value = await fetchAvailableWifi()
    } catch (e) {
      console.error(e);
      availableWifi.value = []
    } finally {
      isGetAvailableWifiLoading.value = false
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
    isWifiConnected,
    isGetCurrentWifiLoading,
    availableWifi,
    isGetAvailableWifiLoading,
    isConnectWifiLoading,
    isConnectWifiError,
    getCurrentWifi,
    getAvailableWifi,
    connectWifi
  };
};
