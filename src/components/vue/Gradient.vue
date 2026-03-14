<script setup lang="ts">
import Grainient from "@components/vue/bits/Grainient/Grainient.vue";
import { isSlowDownMode } from '@stores/slowDownMode.ts';
import { computed } from 'vue';
import {usePreferredReducedMotion} from "@vueuse/core";

const preferredReducedMotion = usePreferredReducedMotion();
const DEFAULT_TIME_SPEED = preferredReducedMotion ? 1 : 2;

const timeSpeed = computed(() => isSlowDownMode.value ? 0.5 : DEFAULT_TIME_SPEED);
</script>

<template>
  <Grainient
      color1="#581B98"
      color2="#9C1DE7"
      color3="#FF073A"
      :time-speed="timeSpeed"
      :color-balance="0.0"
      :warp-strength="1.0"
      :warp-frequency="5.0"
      :warp-speed="2.0"
      :warp-amplitude="50.0"
      :blend-angle="0.0"
      :blend-softness="0.05"
      :rotation-amount="500.0"
      :noise-scale="2.0"
      :grain-amount="0.1"
      :grain-scale="2.0"
      :grain-animated="false"
      :contrast="1.5"
      :gamma="1.0"
      :saturation="1.0"
      :center-x="0.0"
      :center-y="0.0"
      :zoom="0.9"
    />
</template>

<style scoped>

</style>