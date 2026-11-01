<script setup lang="ts">
import { ref, watch } from 'vue'
import LineArt, { type Scene } from './LineArt.vue'

const props = defineProps<{ scenes: Scene[]; active: string }>()

// Keep the last scene this stage owns while another stage's sections are in view.
const current = ref<Scene>(props.scenes[0])
watch(
  () => props.active,
  (id) => {
    if ((props.scenes as string[]).includes(id)) current.value = id as Scene
  },
  { immediate: true },
)
</script>

<template>
  <aside
    aria-hidden="true"
    class="sticky top-[var(--gutter)] hidden h-[calc(100svh-2*var(--gutter))] flex-col bg-field lg:flex"
  >
    <div class="relative grow">
      <div
        v-for="scene in scenes"
        :key="scene"
        class="absolute inset-0 flex items-center justify-center p-[8%] transition-[opacity,transform] duration-[900ms] ease-[var(--ease-expo)]"
        :class="scene === current ? 'opacity-100' : 'scale-[0.97] opacity-0'"
      >
        <LineArt :scene="scene" :drawn="scene === current" class="max-h-full max-w-[38rem]" />
      </div>
    </div>
    <div class="flex h-14 items-center justify-between bg-surface px-[var(--inset)] text-small">
      <slot />
    </div>
  </aside>
</template>
