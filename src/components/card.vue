<script setup lang="ts">
import { computed, withDefaults } from "vue"
import type { StyleValue } from "vue"

import useRelativeTimeFormatter from "../hooks/use-relative-time-formatter"
import daysSinceNow from "../helpers/days-since-now"
import secondLastOrLast from "../helpers/second-last-or-last"
import createClassName from "../helpers/create-class-name"

import { getColors, getImage } from "./card"

import type ShopEntryType from "../types/shop-entry"

export type CardProps = {
  card: ShopEntryType<string>
  size: "small" | "normal" | "double"
}

const props = withDefaults(defineProps<CardProps>(), { size: "normal" })

const relativeTimeFormatter = useRelativeTimeFormatter()

const daysSinceLastSeen = computed(() =>
  daysSinceNow(new Date(secondLastOrLast(props.card.items[0].shopHistory)))
)

const isNew = computed(() => daysSinceLastSeen.value === 0)
const isBundle = computed(() => props.card.bundle !== null)

const image = computed(() => getImage(props.card, props.size))
const colors = computed(() => getColors(props.card))

const cardStyle = computed(
  () =>
    (((colors.value as Array<number | null>).every((color) => color !== null)
      ? {
          "--darker-color": colors.value[0],
          "--lighter-color": colors.value[1],
          "--falloff-color": colors.value[2],
        }
      : {}) as unknown) as StyleValue
)
</script>

<template>
  <div
    :class="
      createClassName([
        'card',
        size,
        isBundle ? 'bundle' : card.items[0].rarity.value,
      ])
    "
    :style="cardStyle"
  >
    <div class="image">
      <div :style="`background-image: url(${image})`"></div>
    </div>
    <div class="rarity">
      {{ isBundle ? "Bundle" : card.items[0].rarity.displayValue }}
    </div>
    <div class="middle">
      <div class="name">
        {{ isBundle ? card.bundle?.name : card.items[0].name }}
      </div>
    </div>
    <div class="bottom">
      <div class="price">
        <del v-if="card.regularPrice !== card.finalPrice">{{
          card.regularPrice
        }}</del>
        <template v-else>{{ card.finalPrice }}</template>
      </div>
      <div :class="createClassName(['ago', isNew && 'new'])">
        {{
          isNew
            ? "New!"
            : relativeTimeFormatter.format(daysSinceLastSeen, "days")
        }}
      </div>
    </div>
  </div>
</template>
