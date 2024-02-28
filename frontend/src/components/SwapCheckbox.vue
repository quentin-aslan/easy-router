<template>
  <label class="swap swap-flip">
    <input v-model="checkboxValue" type="checkbox" />

    <span class="swap-on" title="Hide the password">{{ props.swapOnIcon ?? '🙈' }}</span>
    <span class="swap-off" title="Display the password">{{ props.swapOffIcon ?? '👀' }}</span>
  </label>
</template>
<script setup lang="ts">
type Props = {
  swapOnIcon?: string
  swapOffIcon?: string
}
const props = defineProps<Props>()
const checkboxValue = defineModel<string>()
</script>