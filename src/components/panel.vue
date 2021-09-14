<script setup lang="ts">
import { computed } from "vue"

import createClassName from "../helpers/create-class-name"
import { createAndFillArray } from "./panel"

import Card from "./card.vue"

import type ShopEntryType from "../types/shop-entry"
import type { CardProps } from "./card.vue"

type PanelType = "bundle" | "outfits" | "items"

const props = defineProps<{
  panel: Array<ShopEntryType<string>>
}>()

const panelType = computed<PanelType>(() => {
  if (
    props.panel[0].bundle !== null ||
    props.panel[0].items[0].id === "CID_A_060_Athena_Commando_M_Daytrader_8MRO2"
  ) {
    return "bundle"
  }

  const numberOfOutfits = props.panel.reduce(
    (outfits, card) => outfits + Number(card.items[0].type.value === "outfit"),
    0
  )

  if (numberOfOutfits >= props.panel.length / 2) {
    return "outfits"
  }

  return "items"
})
const getCardSize = computed<(index: number) => CardProps["size"]>(() => {
  if (panelType.value === "bundle") {
    return () => "double"
  }

  if (panelType.value === "outfits") {
    return () => "normal"
  }

  const cardSizes: Array<CardProps["size"]> = createAndFillArray(
    props.panel.length
  )

  return (index: number) => {
    return cardSizes[index]
  }
})
</script>

<template>
  <div
    :class="createClassName(['panel', panelType])"
    :data-children="panel.length.toString()"
  >
    <Card
      v-for="(card, cardIndex) in panel"
      :key="card.bundle?.name ?? card.items[0].name"
      :card="card"
      :size="getCardSize(cardIndex)"
    />
  </div>
</template>
