<template>
  <CardTemplate title="Hotspot Connected Devices">

    <span v-if="isGetConnectedDevicesLoading" class="loading loading-bars loading-lg"></span>
    <span v-else-if="isGetConnectedDevicesError" class="text-error">An error has occurred while retrieving connected devices</span>

    <div v-else>
      <div class="overflow-x-auto">
        <table class="table table-zebra">
          <thead>
            <tr v-if="connectedDevices.length === 0">
              <th>No device connected to the hotspot</th>
            </tr>

            <tr v-else>
              <th>Host name</th>
              <th>IP address</th>
              <th>MAC address</th>
            </tr>

          </thead>

          <tbody>
            <tr v-for="device in connectedDevices">
              <td>{{ device.hostname }}</td>
              <td>{{ device.ip }}</td>
              <td>{{ device.mac }}</td>
            </tr>
          </tbody>

        </table>
      </div>
    </div>
  </CardTemplate>
</template>
<script setup lang="ts">
import CardTemplate from "./CardTemplate.vue";
import {useManageHotspot} from "../composable/use-manage-hotspot";

const { connectedDevices, isGetConnectedDevicesLoading, isGetConnectedDevicesError } = useManageHotspot();

</script>