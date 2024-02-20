import type {VpnStatus} from "@/types";
import type {FetchedVpnStatus} from "@/api/type";

export const vpnStatusAdapter = (fetchedVpnStatus: FetchedVpnStatus): VpnStatus => {
    return {
        city: fetchedVpnStatus.City,
        country: fetchedVpnStatus.Country,
        "current-protocol": fetchedVpnStatus["Current protocol"],
        "current-technology": fetchedVpnStatus["Current technology"],
        hostname: fetchedVpnStatus.Hostname,
        ip: fetchedVpnStatus.IP,
        status: fetchedVpnStatus.Status,
        transfer: fetchedVpnStatus.Transfer,
        uptime: fetchedVpnStatus.Uptime,
    };
}