<script setup lang="ts">
import { ref, computed, Suspense } from 'vue'
import { inject } from '@nuxt/content'
import type { NavItem } from '@nuxt/content'

const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))

const links = computed(() => {
  return navigation.value.find(item => item._path === '/docs')?.children ?? []
})

const handleError = (error: any) => {
  console.error('Error fetching navigation:', error)
  return []
}
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UAside>
          <template #top>
            <UContentSearchButton
              class="rounded-md"
              size="sm"
            />
          </template>

          <Suspense>
            <template #default>
              <UNavigationTree :links="mapContentNavigation(links)" />
            </template>
            <template #fallback>
              <div>Loading navigation...</div>
            </template>
          </Suspense>
        </UAside>
      </template>

      <NuxtPage />
    </UPage>
  </UContainer>
</template>

<style scoped>
/* Add any additional or enhanced styles here */
</style>