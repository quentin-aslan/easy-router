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
const isConnectWifiLoading = ref(false);

export const useManageWifi = () => {
  // All variable created here will be private to the instance of the composable

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
      isConnectWifiLoading.value = true
      const response = await fetch("/api/wifi/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ssid, password }),
      });
      if (response.ok) {
        await getCurrentWifi();
      }
    } catch (e) {
      console.error(e);
    } finally {
        isConnectWifiLoading.value = false
    }
  };

  return {
    currentWifi,
    availableWifi,
    isConnectWifiLoading,
    getCurrentWifi,
    getAvailableWifi,
    connectWifi
  };
};
