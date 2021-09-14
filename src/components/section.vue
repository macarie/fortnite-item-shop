<script setup lang="ts">
import Panel from "./panel.vue"

import type ShopEntryType from "../types/shop-entry"

defineProps<{
  panels: Array<Array<ShopEntryType<string>>>
  sectionName: string
}>()
</script>

<template>
  <section
    :class="`section ${sectionName.toLocaleLowerCase().replace(/\s/g, '')}`"
  >
    <Panel v-for="panel in panels" :panel="panel" />
  </section>
</template>
