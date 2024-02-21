<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <a @click="router.push('/')" class="btn btn-ghost text-xl">🛜 Router Easy 🛜 v{{ version }}</a
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from "../router";
import pkg from '../../package.json';

const version = pkg.version;
</script>
