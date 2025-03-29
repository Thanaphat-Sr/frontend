<script setup lang="ts">
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import type { Event } from '@/types'

const props = defineProps<{
  event: Event
  id: string
}>()

// Extract the event prop
const { event } = toRefs(props)

// Use the Vue Router instance
const router = useRouter()

// Function to handle registration and navigate to the event detail
const register = () => {
  router.push({ name: 'event-detail-view', params: { id: props.id } })
}
</script>

<template>
  <p>Register event here</p>
  <button @click="register">Register</button>
</template>
