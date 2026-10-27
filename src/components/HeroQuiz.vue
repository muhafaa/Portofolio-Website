<script setup lang="ts">
import { computed, ref } from 'vue'
import { products } from '../data/profile'

const emit = defineEmits<{ select: [id: string] }>()

const options = [
  { id: 'semesta', letter: 'A', text: 'Platforms for running tests and psychometric assessments' },
  { id: 'vac', letter: 'B', text: 'Dashboards where assessors score candidates' },
  { id: 'talentics', letter: 'C', text: 'Employee surveys and hiring tools' },
]

const selected = ref<string | null>(null)
const selectedProduct = computed(() => products.find((p) => p.id === selected.value))

function choose(id: string) {
  selected.value = id
  emit('select', id)
}
</script>

<template>
  <form class="rounded-2xl border border-rule bg-surface p-6 sm:p-7" @submit.prevent>
    <fieldset>
      <legend class="mb-1 text-sm text-muted">Question 1 of 1</legend>
      <p class="mb-5 font-display text-2xl font-bold leading-tight">What does Fajri build?</p>

      <div class="flex flex-col gap-2.5">
        <label
          v-for="option in options"
          :key="option.id"
          class="group flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition-colors has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-accent has-[input:focus-visible]:ring-offset-2 has-[input:focus-visible]:ring-offset-surface"
          :class="
            selected === option.id
              ? 'border-accent bg-accent-soft'
              : 'border-rule hover:border-accent'
          "
        >
          <input
            type="radio"
            name="build"
            class="sr-only"
            :value="option.id"
            :checked="selected === option.id"
            @change="choose(option.id)"
          />
          <span
            aria-hidden="true"
            class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors"
            :class="
              selected === option.id
                ? 'border-accent bg-accent text-on-accent'
                : 'border-rule text-muted group-hover:border-accent'
            "
          >
            {{ selected === option.id ? '✓' : option.letter }}
          </span>
          <span class="leading-snug">{{ option.text }}</span>
        </label>
      </div>
    </fieldset>

    <div aria-live="polite" class="mt-5 min-h-[4.5rem] text-[0.95rem]">
      <p v-if="!selectedProduct" class="text-muted">Pick an answer to see the product behind it.</p>
      <div v-else data-test="feedback">
        <p><strong class="font-semibold">Correct.</strong> All three are, actually. {{ selectedProduct.summary }}</p>
        <a
          :href="`#${selectedProduct.id}`"
          class="mt-2 inline-block font-medium text-accent underline decoration-2 underline-offset-4"
        >
          See {{ selectedProduct.name }}
        </a>
      </div>
    </div>
  </form>
</template>
