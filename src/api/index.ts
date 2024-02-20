import {vpnStatusAdapter} from "@/api/adapter";
import type {VpnConnect, VpnDisconnect} from "@/types";

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