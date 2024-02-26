import {BandEnum, HotspotConfig, HotspotConnectedDevices} from "../types";
import {ref} from "vue";
import {fetchHotspotConnectedDevices, fetchHotspotConfig, fetchUpdateHotspotConfig} from "../api";

const connectedDevices = ref<HotspotConnectedDevices[]>([])

const isGetConnectedDevicesLoading = ref(false)
const isGetConnectedDevicesError = ref(false)

const defaultHotspotConfig = {
    ssid: '',
    password: '',
    band: BandEnum["2.4G"]

}

export const hotspotConfig = ref(defaultHotspotConfig)

export const isGetHotspotConfigLoading = ref(false)
export const isGetHotspotConfigError = ref(false)
export const useManageHotspot = () => {

    const getHotspotConfig = async () => {
        try {
            isGetHotspotConfigLoading.value = true
            isGetHotspotConfigError.value = false
            hotspotConfig.value = await fetchHotspotConfig()
        } catch (e) {
            console.error(e)
            hotspotConfig.value = defaultHotspotConfig
            isGetHotspotConfigError.value = true
        } finally {
            isGetHotspotConfigLoading.value = false
        }
    }

    const getConnectedDevices = async () => {
        try {
            isGetConnectedDevicesLoading.value = true
            isGetConnectedDevicesError.value = false
            connectedDevices.value = await fetchHotspotConnectedDevices()
        } catch (e) {
            console.error(e)
            connectedDevices.value = []
            isGetConnectedDevicesError.value = true
        } finally {
            isGetConnectedDevicesLoading.value = false
        }
    }

    const updateHotspotConfig = async (config: HotspotConfig) => {
        try {
            const response = await fetchUpdateHotspotConfig(config)
        } catch (e) {
            console.error(e)
        } finally {

        }
    }

    return {
        connectedDevices,
        getConnectedDevices,
        isGetConnectedDevicesLoading,
        isGetConnectedDevicesError,
        hotspotConfig,
        getHotspotConfig,
        isGetHotspotConfigLoading,
        isGetHotspotConfigError
    }
}