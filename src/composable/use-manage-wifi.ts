import { ref } from "vue";
import type { Ref } from "vue";

export type CurrentWifi = {
  ssid?: string;
};

export type AvailableWifi = {
  ssid: string;
  bars: number;
};

// Variable accessible from the different instances of the composable
const currentWifi: Ref<CurrentWifi | undefined> = ref(undefined);
const availableWifi: Ref<AvailableWifi[]> = ref([]);

export const useManageWifi = () => {
  // All variable created here will be private to the instance of the composable
  const isConnectWifiError = ref(false);
  const isConnectWifiLoading = ref(false);

  const getCurrentWifi = async () => {
    try {
      const response = await fetch("/api/wifi/current");
      currentWifi.value = await response.json();
    } catch (e) {
      console.error(e);
    }
  };

  const getAvailableWifi = async () => {
    try {
      const response = await fetch("/api/wifi/available");
      availableWifi.value = await response.json();
    } catch (e) {
      console.error(e);
    }
  };

  const connectWifi = async (ssid: string, password: string) => {
    try {
      isConnectWifiError.value = false;
      isConnectWifiLoading.value = true;

      const response = await fetch("/api/wifi/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ssid, password }),
      });
      const data = await response.json();
      if (data.success) await getCurrentWifi();
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
