<script setup lang="ts">
import type { Role } from '../data/profile'

defineProps<{ roles: Role[] }>()
</script>

<template>
  <ol class="flex flex-col gap-14">
    <li v-for="role in roles" :key="role.company" data-reveal>
      <p class="text-small text-muted">
        <time>{{ role.start }}</time> to <time>{{ role.end }}</time>
      </p>
      <h3 class="mt-1 text-lead">{{ role.title }}</h3>
      <p class="text-muted">{{ role.company }}, {{ role.location }}</p>
      <p class="mt-3">{{ role.summary }}</p>
      <ul v-if="role.points.length" class="mt-2 list-disc pl-5 marker:text-accent">
        <li v-for="point in role.points" :key="point" class="mt-1">{{ point }}</li>
      </ul>
    </li>
  </ol>
</template>
