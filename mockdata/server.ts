import { createServer } from "miragejs"
import type {AvailableWifi, CurrentWifi} from "@/composable/use-manage-wifi";
import type {FetchedVpnStatus} from "@/api/type";
import {type Ref, ref} from "vue";

// MirageJS Server, documentation here : https://miragejs.com/docs/getting-started/overview/

createServer({
    routes() {
        this.namespace = "api"

        // WIFI API

        const currentWifi: Ref<CurrentWifi> = ref({ ssid: "My current wifi" })

        this.get("/wifi/current", () => {
            return currentWifi.value
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
                currentWifi.value = { ssid: attrs.ssid }
                return { success: true }
            } else {
                return { success: false }
            }
        })

        // NORD VPN API

        const vpnStatusMock = {
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

        const vpnStatus:Ref<FetchedVpnStatus> = ref(vpnStatusMock)

        this.get("/nordvpn/status", () => {
            return vpnStatus.value
        })

        this.post("/nordvpn/connect", (schema, request) => {
            let attrs = JSON.parse(request.requestBody)
            if(attrs.city) {
                vpnStatus.value = vpnStatusMock
                vpnStatus.value.City = attrs.city
                return { success: true }
            } else {
                return { success: false }
            }
        })

        this.get("/nordvpn/disconnect", () => {
            vpnStatus.value = { Status: "Disconnected"}
            return { success: true }
        })
    },
})