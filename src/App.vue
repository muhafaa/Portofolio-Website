<script setup lang="ts">
import { ref } from 'vue'
import HeroQuiz from './components/HeroQuiz.vue'
import ProductSection from './components/ProductSection.vue'
import ExperienceTimeline from './components/ExperienceTimeline.vue'
import {
  contacts,
  education,
  personalProjects,
  products,
  profile,
  roles,
  skills,
} from './data/profile'

const highlighted = ref<string | null>(null)
const year = new Date().getFullYear()
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 sm:px-8">
    <header class="flex items-center justify-between py-6">
      <a href="#top" class="flex items-center gap-3 font-display text-lg font-bold">
        <span
          aria-hidden="true"
          class="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-sm text-on-accent"
          >MF</span
        >
        {{ profile.name }}
      </a>
      <nav aria-label="Sections" class="hidden gap-6 text-muted sm:flex">
        <a href="#work" class="hover:text-ink">Work</a>
        <a href="#projects" class="hover:text-ink">Projects</a>
        <a href="#experience" class="hover:text-ink">Experience</a>
        <a href="#contact" class="hover:text-ink">Contact</a>
      </nav>
    </header>

    <main id="top">
      <section class="grid items-center gap-10 pt-10 pb-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pt-16">
        <div class="hero-text">
          <h1 class="text-[clamp(2.75rem,8vw,5.25rem)] leading-[0.95] font-extrabold tracking-[-0.03em]">
            {{ profile.name }}
          </h1>
          <p class="mt-4 font-display text-2xl font-medium text-muted">
            {{ profile.role }} in {{ profile.location }}
          </p>
          <p class="mt-6 max-w-[52ch] text-lg">{{ profile.intro }}</p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a
              :href="contacts[0].href"
              class="rounded-lg bg-accent px-5 py-2.5 font-medium text-on-accent hover:opacity-90"
              >Email me</a
            >
            <a
              :href="contacts[1].href"
              target="_blank"
              rel="noopener"
              class="rounded-lg border border-rule px-5 py-2.5 font-medium hover:border-accent"
              >LinkedIn</a
            >
            <a
              :href="contacts[2].href"
              target="_blank"
              rel="noopener"
              class="rounded-lg border border-rule px-5 py-2.5 font-medium hover:border-accent"
              >GitHub</a
            >
          </div>
        </div>
        <HeroQuiz @select="highlighted = $event" />
      </section>

      <section id="work" aria-labelledby="work-title" class="scroll-mt-8 pb-16">
        <h2 id="work-title" class="text-4xl font-bold tracking-tight">Products I've built</h2>
        <p class="mt-3 max-w-[60ch] text-muted">
          Three products at Sekolahmu, from 2022 to now. Together they account for 770+ of my merged
          merge requests.
        </p>
        <div class="mt-8">
          <ProductSection
            v-for="product in products"
            :key="product.id"
            :product="product"
            :highlighted="highlighted === product.id"
          />
        </div>
      </section>

      <section id="projects" aria-labelledby="projects-title" class="scroll-mt-8 pb-16">
        <h2 id="projects-title" class="text-4xl font-bold tracking-tight">Personal projects</h2>
        <p class="mt-3 max-w-[60ch] text-muted">Things I build on my own time.</p>
        <div class="mt-8">
          <ProductSection
            v-for="project in personalProjects"
            :key="project.id"
            :product="project"
            :highlighted="false"
          />
        </div>
      </section>

      <section
        id="experience"
        aria-labelledby="experience-title"
        class="grid scroll-mt-8 gap-10 border-t border-rule py-16 md:grid-cols-[15rem_1fr]"
      >
        <h2 id="experience-title" class="text-4xl font-bold tracking-tight">Experience</h2>
        <ExperienceTimeline :roles="roles" />
      </section>

      <section
        aria-labelledby="skills-title"
        class="grid gap-10 border-t border-rule py-16 md:grid-cols-[15rem_1fr]"
      >
        <h2 id="skills-title" class="text-4xl font-bold tracking-tight">Skills</h2>
        <div class="grid gap-8 sm:grid-cols-2">
          <dl class="flex flex-col gap-5">
            <div v-for="group in skills" :key="group.name">
              <dt class="font-semibold">{{ group.name }}</dt>
              <dd class="text-muted">{{ group.items.join(', ') }}</dd>
            </div>
          </dl>
          <div>
            <h3 class="font-sans text-base font-semibold">Education</h3>
            <ul class="mt-1 flex flex-col gap-1 text-muted">
              <li v-for="item in education" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </section>
    </main>

    <footer
      id="contact"
      class="scroll-mt-8 border-t border-rule py-16"
      aria-labelledby="contact-title"
    >
      <div class="grid gap-10 md:grid-cols-[15rem_1fr]">
        <h2 id="contact-title" class="text-4xl font-bold tracking-tight">Contact</h2>
        <div>
          <p class="max-w-[52ch] text-lg">
            Hiring for a frontend role, or want to talk about Vue and assessment products? Email is the
            fastest way to reach me.
          </p>
          <ul class="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            <li v-for="link in contacts" :key="link.label">
              <span class="block text-sm text-muted">{{ link.label }}</span>
              <a
                :href="link.href"
                :target="link.href.startsWith('http') ? '_blank' : undefined"
                rel="noopener"
                class="font-medium break-all text-accent underline decoration-1 underline-offset-4 hover:decoration-2"
                >{{ link.text }}</a
              >
            </li>
          </ul>
        </div>
      </div>
      <p class="mt-16 text-sm text-muted">
        © {{ year }} {{ profile.name }}. Built with Vue 3, Vite, and Tailwind CSS.
        <a
          href="https://github.com/muhafaa/Portofolio-Website"
          target="_blank"
          rel="noopener"
          class="underline underline-offset-4 hover:text-ink"
          >View the source</a
        >.
      </p>
    </footer>
  </div>
</template>

<style scoped>
.hero-text {
  animation: rise 700ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
