<template>
  <dialog class="modal modal-bottom sm:modal-middle" :id="props.id">
    <div class="modal-box">

      <div v-if="props.status === EnumModalStatus.ERROR" role="alert" class="alert alert-error">
        <ErrorIcon />
        <span> {{ content }} </span>
      </div>

      <div v-else-if="props.status === EnumModalStatus.SUCCESS" role="alert" class="alert alert-success">
        <SuccessIcon />
        <span> {{ content }}</span>
      </div>

      <div class="modal-action w-full">
        <form method="dialog" class="w-full">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn w-full">Close</button>
        </form>
      </div>
    </div>
    <!-- it will close the modal when user click outside the modal -->
    <form method="dialog" class="modal-backdrop">
      <button>invisible button</button>
    </form>
  </dialog>
</template>

<script lang="ts" setup>
import ErrorIcon from "../components/icons/ErrorIcon.vue";
import SuccessIcon from "../components/icons/SuccessIcon.vue";
import {EnumModalStatus} from "../types";

type Props = {
  id: string;
  status: EnumModalStatus
  content: string;
}

const props = defineProps<Props>();
</script>
