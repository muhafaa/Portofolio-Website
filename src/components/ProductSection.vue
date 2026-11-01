<script setup lang="ts">
import type { Product } from '../data/profile'
import ArrowIcon from './ArrowIcon.vue'
import LineArt, { type Scene } from './LineArt.vue'

defineProps<{ product: Product }>()
</script>

<template>
  <article :id="product.id" :data-scene="product.id" class="scroll-mt-8 pt-24 first:pt-12">
    <!-- On a phone the stage is gone, so each product carries its own drawing. -->
    <div data-reveal class="mb-8 bg-field p-10 lg:hidden">
      <LineArt :scene="product.id as Scene" class="mx-auto max-w-64" />
    </div>
    <h3 data-reveal class="text-lead">{{ product.name }}</h3>
    <p data-reveal style="--i: 1" class="mt-1 text-small text-muted">{{ product.period }}</p>
    <div data-reveal style="--i: 2" class="mt-5">
      <p>{{ product.summary }}</p>
      <ul class="mt-4 flex list-disc flex-col gap-2 pl-5 marker:text-accent">
        <li v-for="item in product.highlights" :key="item">{{ item }}</li>
      </ul>
      <p class="mt-5 text-small text-muted">Built with {{ product.stack.join(', ') }}.</p>
      <a
        v-if="product.url"
        :href="product.url"
        target="_blank"
        rel="noopener"
        class="link mt-4 inline-block"
        >{{ product.urlLabel ?? 'Open the app' }} <ArrowIcon /></a
      >
    </div>
  </article>
</template>
