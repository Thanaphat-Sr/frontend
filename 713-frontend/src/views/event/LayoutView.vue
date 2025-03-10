<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <nav>
      <router-link :to="{ name: 'event-detail-view', params: { id } }">Details</router-link>
      |
      <router-link :to="{ name: 'event-register-view', params: { id } }">Register</router-link>
      |
      <router-link :to="{ name: 'event-edit-view', params: { id } }">Edit</router-link>
    </nav>
    <router-view :event="event" :id="id" />
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import type { Event } from '@/types'
const props = defineProps<{
  event: Event
  id: string
}>()
const { event, id } = toRefs(props)
</script>
