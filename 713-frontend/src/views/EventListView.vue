<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import type { Event } from '@/types'
import eventService from '@/services/EventService'

const events = ref<Event[]>([])
const totalEvents = ref(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 3)
  return page.value < totalPages
})

interface Props {
  page: number
}

const props = defineProps<Props>()
const page = computed(() => props.page)

watchEffect(() => {
  eventService
    .getEvents(page.value, 3)
    .then((response) => {
      events.value = response.data
      totalEvents.value = response.headers['x-total-count']
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
})

eventService.getEvents(page.value, 3).then((response) => {
  events.value = response.data
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
    <button v-if="hasNextPage" @click="$emit('next-page')">Next Page</button>
  </div>
</template>
