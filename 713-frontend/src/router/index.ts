import { createRouter, createWebHistory } from 'vue-router'
import { useEventStore } from '@/stores/event'
import nProgress from 'nprogress'
import EventListView from '@/views/EventListView.vue'
import EventLayoutView from '@/views/event/LayoutView.vue'
import EventDetailView from '@/views/event/DetailView.vue'
import EventRegisterView from '@/views/event/RegisterView.vue'
import EventEditView from '@/views/event/EditView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import eventService from '@/services/EventService'

const routes = [
  {
    path: '/',
    name: 'event-list-view',
    component: EventListView,
    props: (route) => ({
      page: parseInt(route.query.page as string) || 1,
    }),
  },
  {
    path: '/event/:id',
    name: 'event-layout-view',
    component: EventLayoutView,
    props: true,
    beforeEnter: (to) => {
      const id = parseInt(to.params.id as string)
      const eventStore = useEventStore()
      return eventService
        .getEvent(id)
        .then((response) => {
          eventStore.setEvent(response.data)
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            return {
              name: '404-resource-view',
              params: { resource: 'event' },
            }
          } else {
            return { name: 'network-error-view' }
          }
        })
    },
    children: [
      {
        path: '',
        name: 'event-detail-view',
        component: EventDetailView,
        props: true,
      },
      {
        path: 'register',
        name: 'event-register-view',
        component: EventRegisterView,
        props: true,
      },
      {
        path: 'edit',
        name: 'event-edit-view',
        component: EventEditView,
        props: true,
      },
    ],
  },
  {
    path: '/404/:resource',
    name: '404-resource-view',
    component: NotFoundView,
    props: true,
  },
  {
    path: '/network-error',
    name: 'network-error-view',
    component: NetworkErrorView,
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFoundView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Add nProgress hooks for route changes
router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
