<script setup lang="ts">
import createFeaturedSection from "../helpers/create-featured-section"
import createDailySection from "../helpers/create-daily-section"
import createSpecialSection from "../helpers/create-special-section"

import SectionTitle from "./section-title.vue"
import Section from "./section.vue"

import type ShopType from "../types/shop"

const props = defineProps<{
  shop: ShopType["data"]
}>()

const featured = createFeaturedSection(props.shop.featured.entries)
const daily = createDailySection(props.shop.daily.entries)
const specialSections = createSpecialSection([
  ...(props.shop.specialFeatured?.entries ?? []),
  ...(props.shop.specialDaily?.entries ?? []),
])

const shopTabs = [
  { sectionName: "Featured", sectionEntries: featured },
  { sectionName: "Daily", sectionEntries: daily },
  ...specialSections,
]

console.log("shopTabs", shopTabs)
</script>

<template>
  <template v-for="{ sectionName, sectionEntries } in shopTabs">
    <SectionTitle :sectionName="sectionName" />

    <Section
      v-for="panels in sectionEntries"
      :panels="panels"
      :sectionName="sectionName"
    />
  </template>
</template>
