<script setup lang="ts">
import type { Product } from '../data/profile'

defineProps<{ product: Product }>()
</script>

<template>
  <article
    :id="product.id"
    class="scroll-mt-8 grid gap-4 border-t border-rule py-10 md:grid-cols-[15rem_1fr] md:gap-10"
  >
    <header>
      <h3 class="font-display text-2xl font-bold leading-tight">{{ product.name }}</h3>
      <p class="mt-1 text-muted">{{ product.period }}</p>
      <a
        v-if="product.url"
        :href="product.url"
        target="_blank"
        rel="noopener"
        class="mt-3 inline-block font-medium text-accent underline decoration-2 underline-offset-4"
        >Open the app</a
      >
    </header>

    <div class="max-w-[65ch]">
      <p>{{ product.summary }}</p>
      <ul class="mt-4 flex flex-col gap-2">
        <li v-for="item in product.highlights" :key="item" class="flex gap-3">
          <span aria-hidden="true" class="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span>{{ item }}</span>
        </li>
      </ul>
      <p class="mt-5 text-sm text-muted">
        <span class="sr-only">Built with: </span>
        <span
          v-for="tool in product.stack"
          :key="tool"
          class="mr-1.5 mb-1.5 inline-block rounded-md border border-rule px-2 py-0.5"
        >
          {{ tool }}
        </span>
      </p>
    </div>
  </article>
</template>
