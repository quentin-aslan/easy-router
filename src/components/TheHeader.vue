<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <a @click="router.push('/')" class="btn btn-ghost text-xl">🛜 Router Easy 🛜</a
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
</script>
