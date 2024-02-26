<template>
<div>
  <CardTemplate title="Hotspot Settings">
    <div v-if="isGetHotspotConfigError" role="alert" class="alert alert-error">
      <ErrorIcon />
      <span>Error when retrieving the data</span>
    </div>

    <span v-else-if="isGetHotspotConfigLoading">
      <span class="loading loading-bars loading-lg"></span>
    </span>

    <div v-else class="w-full flex flex-col gap-3">
      <form class="form-control w-full flex flex-col gap-5" @submit.prevent="submitForm">
        <div class="form-control w-full gap-1 text-left">
          <label for="hotspot-ssid" class="label">Hotspot Name (SSID)</label>
          <input id="hotspot-ssid" v-model="ssid" type="text" class="input input-bordered" placeholder="captain" />
        </div>


        <div class="form-control w-full">
          <label for="hotspot-password" class="label">Password</label>
          <label class="input input-bordered flex items-center gap-2">
          <PasswordIcon />
          <input ref="passwordInput" id="hotspot-password" v-model="password" :type="(showPassword) ? 'text' : 'password'" class="grow" placeholder="Wifi Password" />
          <SwapCheckbox v-model="showPassword" />
          </label>
        </div>

        <div class="form-control w-full">
          <label for="hotspot-band" class="label"><span>Band</span></label>
          <div class="flex flex-row gap-5">
            <div class="flex flex-row gap-1 items-center">
              <input type="radio" v-model="band" :value="BandEnum['2.4G']" id="hotspot-band-2.4G" class="radio" :disabled="bandDisabled" />
              <label for="hotspot-band-2.4G" class="label">2.4 GHz</label>
            </div>

            <div class="flex flex-row gap-1 items-center">
              <input type="radio" v-model="band" :value="BandEnum['5G']" id="hotspot-band-5G" class="radio" :disabled="bandDisabled" />
              <label for="hotspot-band-5G" class="label">5 GHz</label>
            </div>
          </div>
        </div>

        <button type="submit" class="btn btn-neutral" :disabled="isSubmitDisabled" >
        Apply Changes
        </button>
      </form>
    </div>
  </CardTemplate>
  <ModalStatus :id="modalId" :status="modalStatus" :content="modalContent" />
</div>
</template>

<script setup lang="ts">
import PasswordIcon from "../components/icons/PasswordIcon.vue";
import {computed, ref} from "vue";
import ModalStatus from "../components/ModalStatus.vue";
import {BandEnum, EnumModalStatus} from "../types";
import CardTemplate from "./CardTemplate.vue";
import {useManageHotspot} from "../composable/use-manage-hotspot";
import SwapCheckbox from "./SwapCheckbox.vue";
import ErrorIcon from "./icons/ErrorIcon.vue";

const { hotspotConfig, isGetHotspotConfigLoading, isGetHotspotConfigError } = useManageHotspot()

const ssid = ref(hotspotConfig.value?.ssid || '');
const password = ref(hotspotConfig.value?.password || '');
const showPassword = ref(false);
const band = ref(hotspotConfig.value?.band || BandEnum["2.4G"]);
const bandDisabled = computed(() => true) // Backend not ready yet

const isSubmitDisabled = computed(() => (
    ssid.value === '' || password.value.length < 3 ||  isGetHotspotConfigLoading.value ||
    ssid.value === hotspotConfig.value?.ssid && password.value === hotspotConfig.value?.password && band.value === hotspotConfig.value?.band
    )
)

const modalId = 'hotspot-settings-modal';
const modalStatus = computed(() => (isGetHotspotConfigError.value) ? EnumModalStatus.ERROR : EnumModalStatus.SUCCESS);
const modalContent = computed(() => (modalStatus.value === EnumModalStatus.ERROR) ? 'Error while updating hotspot settings' : 'Hotspot settings updated successfully');

const submitForm = async () => {
  //(document.getElementById(modalId) as HTMLDialogElement).showModal()
};
</script>
