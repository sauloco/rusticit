<script setup lang="ts">
import MagicBento, {type BentoCardProps} from "@components/vue/bits/MagicBento/MagicBento.vue";
import {useMediaQuery, useSSRWidth} from "@vueuse/core";
import Carousel from "@components/vue/bits/Carousel/Carousel.vue";
import type {CarouselItem} from "@components/vue/bits/Carousel/Carousel.vue";
import {LayoutDashboard, Braces, Gauge, Sparkles, UserCheck, Workflow} from 'lucide-vue-next';
import { useWindowSize } from '@vueuse/core'

const isMobileScreen = useMediaQuery('(max-width: 767px)')

const { width: wWidth } = useWindowSize()

const width = Math.floor(wWidth.value * 0.8)

const color = 'F7F7F720';

type ServiceMasterItem = {
  id: number;
  color: string;
  title: string;
  description: string;
  label: string;
  icon: CarouselItem["icon"];
};

const servicesMaster: ServiceMasterItem[] = [
  {
    id: 1,
    color,
    title: "Frontend Architecture",
    description: "Stabilize your frontend with clear patterns that scale.",
    label: "Stability",
    icon: LayoutDashboard
  },
  {
    id: 2,
    color,
    title: "TypeScript Consistency",
    description: "Unify contracts and conventions to reduce friction.",
    label: "Quality",
    icon: Braces
  },
  {
    id: 3,
    color,
    title: "UI Performance",
    description: "Speed up dashboards, tables, and heavy workflows.",
    label: "Speed",
    icon: Gauge
  },
  {
    id: 4,
    color,
    title: "Vue / React Modernization",
    description: "Incremental upgrades without disrupting delivery.",
    label: "Modernize",
    icon: Sparkles
  },
  {
    id: 5,
    color,
    title: "Senior Embed",
    description: "Plug in fast and own outcomes without hand-holding.",
    label: "Contractor",
    icon: UserCheck
  },
  {
    id: 6,
    color,
    title: "Delivery & Handoff",
    description: "Weekly checkpoints, clean docs, no dependency trap.",
    label: "Process",
    icon: Workflow
  },
];

const cardData: BentoCardProps[] = servicesMaster.map((s) => ({
  color: s.color,
  title: s.title,
  description: s.description,
  label: s.label
}));

const carouselItems: CarouselItem[] = servicesMaster.map((s) => ({
  id: s.id,
  title: s.title,
  description: s.description,
  icon: s.icon
}));
</script>

<template>
  <MagicBento
      v-if="!isMobileScreen"
      :card-data="cardData"
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
  <Carousel
      v-else
      :items="carouselItems"
      :base-width="width"
      :autoplay="false"
      :autoplay-delay="3000"
      :pause-on-hover="false"
      :loop="true"
      :round="false"
  />
</template>