import {vpnStatusAdapter} from "@/api/adapter";
import type {AvailableWifi, CurrentWifi, VpnConnect, VpnDisconnect, WifiConnect} from "@/types";

export const fetchVpnStatus = async () => {
    const response = await fetch("/api/nordvpn/status");
    return vpnStatusAdapter(await response.json());
}

export const fetchVpnConnect = async (city: string): Promise<VpnConnect> => {
    const response = await fetch("/api/nordvpn/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city }),
    });
    return await response.json();
}

export const fetchVpnDisconnect = async (): Promise<VpnDisconnect> => {
    const response = await fetch("/api/nordvpn/disconnect");
    return await response.json();
}

export const fetchCurrentWifi = async (): Promise<CurrentWifi> => {
    const response = await fetch("/api/wifi/current");
    return await response.json();
}

export const fetchAvailableWifi = async (): Promise<AvailableWifi[]> => {
    const response = await fetch("/api/wifi/available");
    return await response.json();
}

export const fetchWifiConnect = async (ssid: string, password: string): Promise<WifiConnect> => {
    const response = await fetch("/api/wifi/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ssid, password }),
    });
    return await response.json();
}