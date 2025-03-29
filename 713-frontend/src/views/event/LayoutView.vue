<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Event } from '@/types'
import eventService from '@/services/EventService'

const event = ref<Event>()
const props = defineProps<{ id: string }>()
const id = Number(props.id)
const router = useRouter()

eventService
  .getEvent(id)
  .then((response) => {
    event.value = response.data
  })
  .catch((error) => {
    if (error.response && error.response.status === 404) {
      router.push({ name: '404-resource-view', params: { resource: 'event' } })
    } else {
      router.push({ name: 'network-error-view' })
    }
  })
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <nav>
      <router-link :to="{ name: 'event-detail-view' }">Details</router-link>
      |
      <router-link :to="{ name: 'event-register-view' }">Register</router-link>
      |
      <router-link :to="{ name: 'event-edit-view' }">Edit</router-link>
    </nav>
    <RouterView :event="event" />
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
