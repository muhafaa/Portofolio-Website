<script setup lang="ts">
import { onMounted, ref } from 'vue'

export type Scene =
  | 'hero'
  | 'semesta'
  | 'vac'
  | 'talentics'
  | 'medina-pos'
  | 'wfh-calendar'
  | 'experience'
  | 'skills'
  | 'contact'

defineProps<{ scene: Scene; drawn?: boolean }>()

const svg = ref<SVGSVGElement>()

// Answer-sheet rows: which bubble is marked in each row.
const marks = [1, 3, 0, 2, 1]
const star = 'M0 -13 L3.5 -4.9 L12.4 -4 L5.7 1.9 L7.6 10.5 L0 6 L-7.6 10.5 L-5.7 1.9 L-12.4 -4 L-3.5 -4.9 Z'
const pin = 'M0 0 C-12 -14 -14 -20 -14 -26 A14 14 0 0 1 14 -26 C14 -20 12 -14 0 0 Z'
const pins: [number, number][] = [
  [70, 350],
  [200, 262],
  [252, 152],
  [330, 62],
]

// Every stroke draws itself: normalise its length to 1 and stagger it by its order.
onMounted(() => {
  svg.value?.querySelectorAll<SVGGeometryElement>('path, circle, rect, line, ellipse').forEach((el, i) => {
    if (el.classList.contains('dot')) return el.style.setProperty('--d', String(i))
    el.setAttribute('pathLength', '1')
    el.classList.add('s')
    el.style.setProperty('--d', String(i))
  })
})
</script>

<template>
  <svg
    ref="svg"
    viewBox="0 0 400 400"
    class="line-art"
    :class="{ 'is-drawn': drawn }"
    aria-hidden="true"
    focusable="false"
  >
    <!-- A laptop writing code, with three agents above it, one of them leading. -->
    <g v-if="scene === 'hero'">
      <g class="float">
        <circle cx="130" cy="84" r="16" />
        <circle cx="200" cy="58" r="16" class="a" />
        <circle cx="270" cy="84" r="16" />
        <circle cx="200" cy="58" r="4" class="dot" />
        <path d="M145 78 L185 64" />
        <path d="M215 64 L255 78" />
        <path d="M200 74 C230 100 170 118 200 150" class="a" />
      </g>
      <rect x="90" y="150" width="220" height="140" rx="6" />
      <rect x="104" y="164" width="192" height="112" rx="2" />
      <path d="M150 200 L130 220 L150 240" />
      <path d="M188 246 L212 194" class="a" />
      <path d="M250 200 L270 220 L250 240" />
      <path d="M90 290 L60 308 H340 L310 290" />
      <path d="M60 308 Q60 316 70 316 H330 Q340 316 340 308" />
      <path d="M180 308 H220" />
      <path d="M350 264 H382 V296 A10 10 0 0 1 372 306 H360 A10 10 0 0 1 350 296 Z" />
      <path d="M382 274 A9 9 0 0 1 382 292" />
      <g class="float">
        <path d="M358 252 C352 244 364 240 358 232" />
        <path d="M372 252 C366 244 378 240 372 232" />
      </g>
    </g>

    <!-- An answer sheet with one bubble marked per row, and a pencil. -->
    <g v-else-if="scene === 'semesta'">
      <rect x="96" y="40" width="208" height="292" rx="2" />
      <path d="M122 74 H230" />
      <path d="M122 94 H190" />
      <g v-for="(mark, row) in marks" :key="row">
        <path :d="`M122 ${140 + row * 34} H140`" />
        <template v-for="col in 4" :key="col">
          <circle
            :cx="146 + col * 32"
            :cy="140 + row * 34"
            r="9"
            :class="{ a: col - 1 === mark }"
          />
          <circle
            v-if="col - 1 === mark"
            :cx="146 + col * 32"
            :cy="140 + row * 34"
            r="4"
            class="dot"
          />
        </template>
      </g>
      <g class="float">
        <path d="M262 362 L344 280 L360 296 L278 378 Z" />
        <path d="M336 288 L352 304" />
        <path d="M262 362 L250 390 L278 378" />
        <path d="M254 381 L250 390 L259 386" class="a" />
      </g>
    </g>

    <!-- A scoring clipboard with checked criteria, ratings and a magnifier. -->
    <g v-else-if="scene === 'vac'">
      <rect x="106" y="56" width="188" height="272" rx="8" />
      <rect x="160" y="44" width="80" height="24" rx="5" />
      <path d="M184 44 A16 16 0 0 1 216 44" />
      <g v-for="(y, i) in [114, 164, 214]" :key="y">
        <rect x="132" :y="y - 11" width="22" height="22" rx="3" />
        <path :d="`M137 ${y} l5 6 l10 -12`" class="a" />
        <path :d="`M172 ${y - 4} H${i === 1 ? 250 : 268}`" />
        <path :d="`M172 ${y + 10} H226`" />
      </g>
      <g v-for="(x, i) in [150, 182, 214]" :key="x" :transform="`translate(${x} 272)`">
        <path :d="star" :class="{ a: i < 2 }" />
      </g>
      <g class="float">
        <circle cx="292" cy="282" r="36" class="glass" />
        <path d="M273 272 A22 22 0 0 1 290 258" class="a" />
        <path d="M318 308 L352 342" />
        <path d="M330 320 L346 336" />
      </g>
    </g>

    <!-- A survey: an eNPS gauge, answers as bars, and a comment bubble. -->
    <g v-else-if="scene === 'talentics'">
      <path d="M90 200 A90 90 0 0 1 270 200" />
      <path d="M118 200 A62 62 0 0 1 242 200" />
      <path d="M90 200 H118" />
      <path d="M242 200 H270" />
      <path d="M180 200 L230 146" class="a" />
      <circle cx="180" cy="200" r="7" />
      <path d="M82 330 H282" />
      <rect x="100" y="282" width="30" height="48" />
      <rect x="146" y="258" width="30" height="72" />
      <rect x="192" y="236" width="30" height="94" class="a" />
      <rect x="238" y="268" width="30" height="62" />
      <g class="float">
        <path
          d="M280 64 H352 A10 10 0 0 1 362 74 V116 A10 10 0 0 1 352 126 H308 L290 142 V126 H280 A10 10 0 0 1 270 116 V74 A10 10 0 0 1 280 64 Z"
        />
        <path d="M288 88 H342" />
        <path d="M288 104 H322" />
      </g>
    </g>

    <!-- A till receipt that still prints while the wifi is down. -->
    <g v-else-if="scene === 'medina-pos'">
      <path
        d="M118 46 H258 V330 l-14 -10 l-14 10 l-14 -10 l-14 10 l-14 -10 l-14 10 l-14 -10 l-14 10 l-14 -10 l-14 10 Z"
      />
      <path d="M148 80 H228" />
      <path d="M164 98 H212" />
      <g v-for="y in [132, 156, 180, 204]" :key="y">
        <path :d="`M138 ${y} H198`" />
        <path :d="`M220 ${y} H238`" />
      </g>
      <path d="M138 232 H238" />
      <path d="M138 266 H178" class="a" />
      <path d="M204 266 H238" class="a" />
      <g class="float">
        <path d="M284 136 Q320 104 356 136" />
        <path d="M296 152 Q320 132 344 152" />
        <path d="M308 168 Q320 158 332 168" />
        <circle cx="320" cy="182" r="3" class="dot" />
        <path d="M292 112 L350 192" class="a" />
      </g>
      <ellipse cx="320" cy="306" rx="30" ry="9" />
      <ellipse cx="320" cy="290" rx="30" ry="9" />
      <ellipse cx="320" cy="274" rx="30" ry="9" class="a" />
      <path d="M290 274 V306" />
      <path d="M350 274 V306" />
    </g>

    <!-- A month of Fridays: past ones locked, one marked for home. -->
    <g v-else-if="scene === 'wfh-calendar'">
      <rect x="70" y="80" width="260" height="244" rx="8" />
      <path d="M70 124 H330" />
      <rect x="114" y="62" width="12" height="34" rx="6" />
      <rect x="274" y="62" width="12" height="34" rx="6" />
      <g v-for="row in 4" :key="row">
        <circle
          v-for="col in 4"
          :key="col"
          :cx="106 + (col - 1) * 47"
          :cy="157 + (row - 1) * 44"
          r="3"
        />
        <rect x="276" :y="140 + (row - 1) * 44" width="40" height="34" rx="4" class="a" />
      </g>
      <rect x="290" y="155" width="12" height="10" rx="2" />
      <path d="M292 155 V151 A4 4 0 0 1 300 151 V155" />
      <g class="float">
        <path d="M286 245 L296 235 L306 245" class="a" />
        <path d="M289 243 V256 H303 V243" />
      </g>
    </g>

    <!-- A road from Palembang to Jakarta, one pin for each stop. -->
    <g v-else-if="scene === 'experience'">
      <path d="M70 350 C150 340 120 272 200 262 S300 202 252 152 S232 72 330 62" />
      <path d="M190 388 L240 344 L268 366 L304 334 L356 388" />
      <g v-for="([x, y], i) in pins" :key="i" :transform="`translate(${x} ${y})`">
        <path :d="pin" :class="{ a: i === pins.length - 1 }" />
        <circle cy="-26" r="5" :class="{ a: i === pins.length - 1 }" />
      </g>
      <path d="M330 62 V20 L360 30 L330 40" class="a float" />
    </g>

    <!-- A stack of books and a mug of pencils. -->
    <g v-else-if="scene === 'skills'">
      <rect x="62" y="290" width="178" height="36" rx="3" />
      <rect x="80" y="254" width="152" height="36" rx="3" />
      <rect x="56" y="218" width="164" height="36" rx="3" class="a" />
      <path d="M96 308 H188" />
      <path d="M108 272 H196" />
      <path d="M88 236 H168" />
      <path d="M262 232 V312 A14 14 0 0 0 276 326 H318 A14 14 0 0 0 332 312 V232 Z" />
      <path d="M332 252 A16 16 0 0 1 332 290" />
      <g class="float">
        <path d="M278 232 V152 L284 138 L290 152 V232" />
        <path d="M300 232 V170 L306 156 L312 170 V232" class="a" />
        <path d="M278 152 H290" />
        <path d="M300 170 H312" />
      </g>
    </g>

    <!-- An envelope, and a paper plane leaving it. -->
    <g v-else>
      <rect x="70" y="214" width="200" height="130" rx="4" />
      <path d="M70 218 L170 292 L270 218" />
      <path d="M70 340 L146 278" />
      <path d="M270 340 L194 278" />
      <path d="M172 206 C150 150 236 128 214 176 C204 196 244 156 268 128" />
      <g class="float">
        <path d="M262 116 L352 66 L318 166 L296 132 Z" class="a" />
        <path d="M352 66 L296 132" class="a" />
      </g>
    </g>
  </svg>
</template>
