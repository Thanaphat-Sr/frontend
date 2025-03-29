<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Event } from '@/types'
import eventService from '@/services/EventService'

const events = ref<Event[]>([])
const router = useRouter()

eventService
  .getEvents()
  .then((response) => {
    events.value = response.data
  })
  .catch(() => {
    router.push({ name: 'network-error-view' })
  })
</script>

<template>
  <div>
    <h1>Event List</h1>
    <ul>
      <li v-for="event in events" :key="event.id">
        <router-link :to="{ name: 'event-detail-view', params: { id: event.id } }">
          {{ event.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
