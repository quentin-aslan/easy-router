import { createServer } from "miragejs"
import type {AvailableWifi, CurrentWifi} from "@/composable/use-manage-wifi";
import type {FetchedVpnStatus} from "@/api/type";

// MirageJS Server, documentation here : https://miragejs.com/docs/getting-started/overview/

createServer({
    routes() {
        this.namespace = "api"

        this.get("/wifi/current", () => {
            const currentWifi: CurrentWifi = {
                ssid: "My current wifi"
            }
            return currentWifi
        })

        this.get("/wifi/available", () => {
            const availableWifi: AvailableWifi[] = [{
                ssid: "My first wifi",
                bars: 3
            }, {
                ssid: "My second wifi",
                bars: 2
            }]

            return availableWifi
        })

        this.post("/wifi/connect", (schema, request) => {
            let attrs = JSON.parse(request.requestBody)
            if(attrs.ssid && attrs.password) {
                return { success: false }
            } else {
                return { success: false }
            }
        })

        this.post("/nordvpn/connect", (schema, request) => {
            let attrs = JSON.parse(request.requestBody)
            if(attrs.city) {
                return { success: true }
            } else {
                return { success: false }
            }
        })

        this.get("/nordvpn/disconnect", () => {
            return { success: true }
        })

        this.get("/nordvpn/status", () => {
            const vpnStatus: FetchedVpnStatus = {
                "Status": "Connected",
                "Hostname": "xxxx.nordvpn.com",
                "IP": "x.x.x.x",
                "Country": "Canada",
                "City": "Montreal",
                "Current technology": "NORDLYNX",
                "Current protocol": "UDP",
                "Transfer": "14.30 MiB received, 1.99 MiB sent",
                "Uptime": "8 minutes 52 seconds"
            }

            return vpnStatus
        })
    },
})