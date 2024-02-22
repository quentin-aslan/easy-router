<template>
  <div class="card bg-base-100 shadow-xl flex flex-row items-center">
    <div class="card-body items-center text-center gap-5 p-5">
      <h1 class="text-xl">{{ props.title }}</h1>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  title: string;
};

const props = defineProps<Props>();
</script>
