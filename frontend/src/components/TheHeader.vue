<template>
  <div class="navbar bg-base-100 flex items-center justify-center">
    <span class="text-xl select-none" >🛜 Router Easy v{{ version }}</span>
  </div>
</template>

<script lang="ts" setup>
import pkg from '../../package.json';

const version = pkg.version;
</script>
