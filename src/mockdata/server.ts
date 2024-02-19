import { createServer } from "miragejs"
import type {AvailableWifi, CurrentWifi} from "@/composable/use-manage-wifi";

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
                return { success: true }
            } else {
                return { success: false }
            }
        })
    },
})