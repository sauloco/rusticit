<script setup lang="ts">
import MagicBento from "@components/vue/bits/MagicBento/MagicBento.vue";

const deviceSize = 
</script>

<template>
  <MagicBento
      :text-auto-hide="true"
      :enable-stars="false"
      :enable-spotlight="true"
      :enable-border-glow="true"
      :enable-tilt="false"
      :enable-magnetism="false"
      :click-effect="true"
      :spotlight-radius="100"
      :particle-count="12"
      glow-color="247,247,247"
  />
</template>