<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import ProductSection from './components/ProductSection.vue'
import ExperienceTimeline from './components/ExperienceTimeline.vue'
import ArrowIcon from './components/ArrowIcon.vue'
import LineArt from './components/LineArt.vue'
import StagePanel from './components/StagePanel.vue'
import posOffline from './assets/medina/pos-offline.webp'
import posBayar from './assets/medina/pos-bayar.webp'
import tutupShift from './assets/medina/tutup-shift.webp'
import laporanHarian from './assets/medina/laporan-harian.webp'
import {
  contacts,
  education,
  personalProjects,
  products,
  profile,
  roles,
  skills,
} from './data/profile'

const year = new Date().getFullYear()
const [email, linkedin, github] = contacts
const [medina, wfh] = personalProjects

const medinaShots = [
  { src: posBayar, caption: 'Paying: quick cash buttons and a keypad.' },
  { src: tutupShift, caption: 'Closing a shift: the drawer is Rp2.000 short.' },
  { src: laporanHarian, caption: 'The daily report for the owner.' },
]

// The stage shows the drawing of the section crossing the middle of the screen,
// or of the work row under the pointer.
const scrollScene = ref('hero')
const hoverScene = ref<string | null>(null)
const active = computed(() => hoverScene.value ?? scrollScene.value)

// Jakarta time on the stage, so the page is a little different on every visit.
const clock = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Jakarta',
  hour: '2-digit',
  minute: '2-digit',
})
const time = ref(clock.format(new Date()))

const message = ref('')
function writeEmail() {
  const body = encodeURIComponent(message.value.trim())
  window.location.href = `${email.href}?subject=${encodeURIComponent('Hello from your website')}&body=${body}`
}

let observers: IntersectionObserver[] = []
let timer: number | undefined

onMounted(() => {
  timer = window.setInterval(() => (time.value = clock.format(new Date())), 15_000)

  const scenes = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) scrollScene.value = (e.target as HTMLElement).dataset.scene!
    },
    { rootMargin: '-50% 0px -50% 0px' },
  )
  document.querySelectorAll('[data-scene]').forEach((el) => scenes.observe(el))

  const reveals = new IntersectionObserver(
    (entries, obs) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        e.target.classList.add('is-in')
        obs.unobserve(e.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  )
  document.querySelectorAll('[data-reveal]').forEach((el) => reveals.observe(el))

  observers = [scenes, reveals]
})

onUnmounted(() => {
  observers.forEach((o) => o.disconnect())
  window.clearInterval(timer)
})
</script>

<template>
  <div class="flex flex-col gap-[var(--gutter)] p-[var(--gutter)]">
    <div class="grid gap-[var(--gutter)] lg:grid-cols-2">
      <div class="bg-surface px-[var(--inset)] pb-32">
        <header class="flex h-20 items-center justify-between gap-6 text-small">
          <a href="#top" class="link tap no-underline">{{ profile.name }}</a>
          <nav aria-label="Sections" class="flex gap-5 sm:gap-7">
            <a href="#work" class="link tap no-underline hover:underline">Work</a>
            <a href="#projects" class="link tap no-underline hover:underline">Projects</a>
            <a href="#experience" class="link tap hidden no-underline hover:underline sm:inline">Experience</a>
            <a href="#contact" class="link tap no-underline hover:underline">Contact</a>
          </nav>
        </header>

        <main id="top">
          <section data-scene="hero" class="flex min-h-[calc(100svh-5rem-2*var(--gutter))] flex-col justify-center pb-16">
            <div class="mb-12 bg-field p-10 lg:hidden is-in">
              <LineArt scene="hero" class="mx-auto max-w-72" />
            </div>
            <h1 class="hero-line text-display leading-[1.02]">{{ profile.name }}</h1>
            <p class="hero-line mt-8 max-w-[30ch] text-lead" style="--i: 1">{{ profile.role }}</p>
            <blockquote class="hero-line mt-10 max-w-[40ch] text-lead italic text-accent" style="--i: 2">
              “{{ profile.quote }}”
            </blockquote>
            <p class="hero-line mt-3 max-w-[46ch]" style="--i: 3">{{ profile.intro }}</p>
            <div class="hero-line mt-10 flex flex-wrap items-center gap-x-7 gap-y-4" style="--i: 4">
              <a :href="email.href" class="button">Email me <ArrowIcon /></a>
              <a :href="linkedin.href" target="_blank" rel="noopener" class="link">LinkedIn</a>
              <a :href="github.href" target="_blank" rel="noopener" class="link">GitHub</a>
            </div>
          </section>

          <section id="work" aria-labelledby="work-title" class="scroll-mt-8 pt-24">
            <h2 id="work-title" data-reveal class="text-head">Products I’ve built</h2>
            <p data-reveal style="--i: 1" class="mt-6 max-w-[46ch]">
              Three products at Sekolahmu, from 2022 to now. Together they account for 770+ of my
              merged merge requests.
            </p>
            <ol data-reveal style="--i: 2" class="ledger mt-10" @mouseleave="hoverScene = null">
              <li v-for="product in products" :key="product.id">
                <a
                  :href="`#${product.id}`"
                  :aria-label="`${product.name}, ${product.kind}, ${product.period}`"
                  class="grid grid-cols-[1fr_auto] items-baseline gap-x-6 py-3 sm:grid-cols-[1.2fr_1fr_auto]"
                  @mouseenter="hoverScene = product.id"
                  @focus="hoverScene = product.id"
                  @blur="hoverScene = null"
                >
                  <span>{{ product.name }}</span>
                  <span
                    class="col-span-2 row-start-2 text-small text-muted sm:col-span-1 sm:col-start-2 sm:row-start-1"
                    >{{ product.kind }}</span
                  >
                  <span class="text-small text-muted tabular-nums">{{ product.period }}</span>
                </a>
              </li>
            </ol>
            <ProductSection v-for="product in products" :key="product.id" :product="product" />
          </section>
        </main>
      </div>

      <StagePanel :scenes="['hero', 'semesta', 'vac', 'talentics']" :active="active">
        <span>Jakarta, Indonesia</span>
        <span class="tabular-nums">{{ time }} WIB</span>
      </StagePanel>
    </div>

    <section
      id="projects"
      aria-labelledby="projects-title"
      class="scroll-mt-4 bg-surface px-[var(--inset)] py-32"
    >
      <h2 id="projects-title" data-reveal class="text-head">Personal projects</h2>
      <p data-reveal style="--i: 1" class="mt-6 max-w-[46ch]">
        Things I build on my own time, with AI coding agents that I direct and review.
      </p>

      <article
        :id="medina.id"
        class="mt-20 grid scroll-mt-8 gap-x-16 gap-y-10 lg:grid-cols-[5fr_7fr]"
      >
        <div>
          <h3 data-reveal class="text-lead">{{ medina.name }}</h3>
          <p data-reveal style="--i: 1" class="mt-1 text-small text-muted">
            {{ medina.kind }}, {{ medina.period }}
          </p>
          <div data-reveal style="--i: 2" class="mt-5 max-w-[50ch]">
            <p>{{ medina.summary }}</p>
            <ul class="mt-4 flex list-disc flex-col gap-2 pl-5 marker:text-accent">
              <li v-for="item in medina.highlights" :key="item">{{ item }}</li>
            </ul>
            <p class="mt-5 text-small text-muted">Built with {{ medina.stack.join(', ') }}.</p>
            <a :href="medina.url" target="_blank" rel="noopener" class="link mt-4 inline-block"
              >{{ medina.urlLabel }} <ArrowIcon /></a
            >
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <figure data-reveal style="--i: 2">
            <div class="overflow-clip">
              <img
                :src="posOffline"
                width="2880"
                height="1800"
                loading="lazy"
                class="drift block h-auto w-full"
                alt="The Medina POS till while offline: products with barcodes and stock on the left, the cart and its Rp45.500 total on the right."
              />
            </div>
            <figcaption class="mt-2 text-small text-muted">The till keeps selling while the internet is down.</figcaption>
          </figure>
          <div class="grid gap-4 sm:grid-cols-3">
            <figure v-for="(shot, i) in medinaShots" :key="shot.src" data-reveal :style="`--i: ${i + 3}`" class="shot">
              <div class="overflow-clip">
                <img :src="shot.src" width="2880" height="1800" loading="lazy" class="block h-auto w-full" :alt="shot.caption" />
              </div>
              <figcaption class="mt-2 text-small text-muted">{{ shot.caption }}</figcaption>
            </figure>
          </div>
        </div>
      </article>

      <article
        :id="wfh.id"
        class="mt-32 grid scroll-mt-8 items-center gap-x-16 gap-y-10 lg:grid-cols-[5fr_7fr]"
      >
        <div data-reveal class="bg-field p-12">
          <LineArt scene="wfh-calendar" class="mx-auto max-w-80" />
        </div>
        <div>
          <h3 data-reveal class="text-lead">{{ wfh.name }}</h3>
          <p data-reveal style="--i: 1" class="mt-1 text-small text-muted">{{ wfh.kind }}, {{ wfh.period }}</p>
          <div data-reveal style="--i: 2" class="mt-5 max-w-[56ch]">
            <p>{{ wfh.summary }}</p>
            <ul class="mt-4 flex list-disc flex-col gap-2 pl-5 marker:text-accent">
              <li v-for="item in wfh.highlights" :key="item">{{ item }}</li>
            </ul>
            <p class="mt-5 text-small text-muted">Built with {{ wfh.stack.join(', ') }}.</p>
            <a :href="wfh.url" target="_blank" rel="noopener" class="link mt-4 inline-block"
              >Open the app <ArrowIcon /></a
            >
          </div>
        </div>
      </article>
    </section>

    <div class="grid gap-[var(--gutter)] lg:grid-cols-2">
      <StagePanel :scenes="['experience', 'skills', 'contact']" :active="active">
        <span>{{ profile.name }}</span>
        <span>{{ email.text }}</span>
      </StagePanel>

      <div class="bg-surface px-[var(--inset)] py-32">
        <section id="experience" data-scene="experience" aria-labelledby="experience-title" class="scroll-mt-4">
          <div data-reveal class="mb-12 bg-field p-10 lg:hidden">
            <LineArt scene="experience" class="mx-auto max-w-64" />
          </div>
          <h2 id="experience-title" data-reveal class="text-head">Experience</h2>
          <div class="mt-12">
            <ExperienceTimeline :roles="roles" />
          </div>
        </section>

        <section data-scene="skills" aria-labelledby="skills-title" class="pt-40">
          <div data-reveal class="mb-12 bg-field p-10 lg:hidden">
            <LineArt scene="skills" class="mx-auto max-w-64" />
          </div>
          <h2 id="skills-title" data-reveal class="text-head">Skills</h2>
          <dl class="mt-12 flex flex-col gap-6">
            <div v-for="(group, i) in skills" :key="group.name" data-reveal :style="`--i: ${i}`">
              <dt class="text-small text-muted">{{ group.name }}</dt>
              <dd class="mt-1">{{ group.items.join(', ') }}</dd>
            </div>
            <div data-reveal :style="`--i: ${skills.length}`">
              <dt class="text-small text-muted">Education</dt>
              <dd v-for="item in education" :key="item" class="mt-1">{{ item }}</dd>
            </div>
          </dl>
        </section>

        <section id="contact" data-scene="contact" aria-labelledby="contact-title" class="scroll-mt-4 pt-40">
          <div data-reveal class="mb-12 bg-field p-10 lg:hidden">
            <LineArt scene="contact" class="mx-auto max-w-64" />
          </div>
          <h2 id="contact-title" data-reveal class="text-head">Contact</h2>
          <p data-reveal style="--i: 1" class="mt-8 text-lead">
            <span class="block text-muted">Have a role or a project in mind?</span>
            <span class="block">Write me a line.</span>
          </p>
          <form
            data-reveal
            style="--i: 2"
            :action="email.href"
            method="get"
            class="relative mt-7 max-w-[34rem]"
            @submit.prevent="writeEmail"
          >
            <label for="message" class="sr-only">Your message</label>
            <input
              id="message"
              v-model="message"
              name="body"
              type="text"
              autocomplete="off"
              placeholder="Hi Fajri, …"
              aria-describedby="message-note"
              class="h-16 w-full bg-input pr-20 pl-5 text-body placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
            />
            <button
              type="submit"
              aria-label="Write the email"
              class="button absolute top-2 right-2 h-12 w-12 justify-center p-0"
            >
              <ArrowIcon />
            </button>
          </form>
          <p id="message-note" data-reveal style="--i: 3" class="mt-4 text-small text-muted">
            Opens your email app with the message filled in.
          </p>
          <ul data-reveal style="--i: 4" class="mt-16 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            <li v-for="link in contacts" :key="link.label">
              <span class="block text-small text-muted">{{ link.label }}</span>
              <a
                :href="link.href"
                :target="link.href.startsWith('http') ? '_blank' : undefined"
                rel="noopener"
                class="link tap [overflow-wrap:anywhere]"
                >{{ link.text }}</a
              >
            </li>
          </ul>
        </section>
      </div>
    </div>

    <footer
      class="grid gap-2 px-[var(--inset)] pt-[24svh] pb-6 text-small sm:grid-cols-[1fr_auto_1fr] sm:items-baseline sm:gap-8"
    >
      <p class="text-muted">{{ profile.name }}, software engineer</p>
      <p class="flex flex-wrap gap-x-6 gap-y-1">
        <a :href="email.href" class="link tap">Email</a>
        <a :href="linkedin.href" target="_blank" rel="noopener" class="link tap">LinkedIn</a>
        <a :href="github.href" target="_blank" rel="noopener" class="link tap">GitHub</a>
        <a href="https://github.com/muhafaa/Portofolio-Website" target="_blank" rel="noopener" class="link tap"
          >Source</a
        >
      </p>
      <p class="text-muted sm:text-right">© {{ year }}, built with Vue 3, Vite and Tailwind CSS</p>
    </footer>
  </div>
</template>

<style scoped>
/* The first screen arrives in reading order, done within about a second. */
@media (prefers-reduced-motion: no-preference) {
  .hero-line {
    animation: rise 900ms var(--ease-expo) both;
    animation-delay: calc(var(--i, 0) * 90ms + 100ms);
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* The work index: the row under the pointer stays in ink, the others step back. */
.ledger a {
  transition: color var(--t-hover) ease;
}
.ledger:is(:hover, :focus-within) a:not(:hover, :focus-visible),
.ledger:is(:hover, :focus-within) a:not(:hover, :focus-visible) span {
  color: var(--muted);
}

.shot img {
  transition: transform var(--t-ui) var(--ease-out);
}
.shot:hover img {
  transform: scale(1.03);
}
</style>
