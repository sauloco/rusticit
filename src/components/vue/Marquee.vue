<script setup lang="ts">
import {Vue3Marquee} from "vue3-marquee";
import { useColorMode } from '@vueuse/core'

const marqueeArray = [
  'Working with EU B2B SaaS teams',
  'Async-first',
  'US LLC for international invoicing'
];

const colorMode = useColorMode()

</script>

<template>
  <Vue3Marquee
      class="bg-purple-light dark:bg-purple-dark"
      pause-on-hover
  >
    <div class="py-1 overflow-hidden flex flex-row gap-2">

          <span
              class="font-inter font-light"
              v-for="(word, index) in marqueeArray"
              :key="index"
          >
            {{ word }}
        </span>
    </div>

  </Vue3Marquee>
</template>

<style scoped>

</style>