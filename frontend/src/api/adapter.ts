import {type VpnStatus, VpnStatusEnum} from "../types";
import type {FetchedVpnStatus} from "./type";

export const vpnStatusAdapter = (fetchedVpnStatus: FetchedVpnStatus): VpnStatus => {
    return {
        city: fetchedVpnStatus.City,
        country: fetchedVpnStatus.Country,
        "current-protocol": fetchedVpnStatus["Current protocol"],
        "current-technology": fetchedVpnStatus["Current technology"],
        hostname: fetchedVpnStatus.Hostname,
        ip: fetchedVpnStatus.IP,
        status: (fetchedVpnStatus.Status === VpnStatusEnum.CONNECTED ? VpnStatusEnum.CONNECTED : VpnStatusEnum.DISCONNECTED),
        transfer: fetchedVpnStatus.Transfer,
        uptime: fetchedVpnStatus.Uptime,
    };
}