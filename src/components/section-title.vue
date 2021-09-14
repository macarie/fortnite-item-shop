<script setup lang="ts">
defineProps<{
  sectionName: string
}>()
</script>

<template>
  <span className="title">{{ sectionName }}</span>
</template>
