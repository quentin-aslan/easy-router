export enum EnumModalStatus {
    "SUCCESS" = "success",
    "ERROR" = "error"
}

export type VpnStatus = {
    disconnected?: boolean,
    city?: string,
    country?: string,
    "current-protocol"?: string,
    "current-technology"?: string,
    hostname?: string,
    ip?: string,
    status?: string,
    transfer?: string,
    uptime?: string
};

export type VpnConnect = {
    success: boolean
}

export type VpnDisconnect = {
    success: boolean
}

