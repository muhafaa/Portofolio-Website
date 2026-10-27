<script setup lang="ts">
import type { Role } from '../data/profile'

defineProps<{ roles: Role[] }>()
</script>

<template>
  <ol class="relative border-l-2 border-rule pl-7 sm:pl-9">
    <li v-for="role in roles" :key="role.company" class="relative pb-10 last:pb-0">
      <span
        aria-hidden="true"
        class="absolute top-1.5 -left-[2.1rem] h-3.5 w-3.5 rounded-full border-2 border-accent bg-paper sm:-left-[2.6rem]"
      />
      <p class="text-sm text-muted">
        <time>{{ role.start }}</time> to <time>{{ role.end }}</time>
      </p>
      <h3 class="mt-1 font-display text-xl font-bold leading-tight">{{ role.title }}</h3>
      <p class="text-muted">{{ role.company }}, {{ role.location }}</p>
      <div class="mt-3 max-w-[65ch]">
        <p>{{ role.summary }}</p>
        <ul v-if="role.points.length" class="mt-2 list-disc pl-5 marker:text-accent">
          <li v-for="point in role.points" :key="point" class="mt-1">{{ point }}</li>
        </ul>
      </div>
    </li>
  </ol>
</template>
