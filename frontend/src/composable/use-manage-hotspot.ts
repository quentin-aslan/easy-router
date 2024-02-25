import {HotspotConnectedDevices} from "../types";
import {ref} from "vue";
import {fetchHotspotConnectedDevices} from "../api";

const connectedDevices = ref<HotspotConnectedDevices[]>([])

const isGetConnectedDevicesLoading = ref(false)
const isGetConnectedDevicesError = ref(false)
export const useManageHotspot = () => {

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

    return {
        connectedDevices,
        getConnectedDevices,
        isGetConnectedDevicesLoading,
        isGetConnectedDevicesError
    }
}