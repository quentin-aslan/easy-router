export enum EnumModalStatus {
    "SUCCESS" = "success",
    "ERROR" = "error"
}

export enum VpnStatusEnum {
    "DISCONNECTED" = "Disconnected",
    "CONNECTED" = "Connected"
}

export type VpnStatus = {
    disconnected?: boolean,
    city?: string,
    country?: string,
    "current-protocol"?: string,
    "current-technology"?: string,
    hostname?: string,
    ip?: string,
    status?: VpnStatusEnum,
    transfer?: string,
    uptime?: string
};

export type VpnConnect = {
    success: boolean
}

export type VpnDisconnect = {
    success: boolean
}

export type CurrentWifi = {
    ssid?: string;
};

export type AvailableWifi = {
    ssid: string;
    bars: number;
};

export type WifiConnect = {
    success: boolean
};

export type HotspotConnectedDevices = {
    hostname: string;
    ip: string;
    mac: string;
}