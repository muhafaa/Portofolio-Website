// Medina POS overview: every behaviour here is progressive. Without this file the page still reads
// top to bottom: all screens show stacked, the till shows its first stage, the figure shows 60 sales.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// A real EAN-13 barcode across the top of the receipt (899 is Indonesia's GS1 prefix).
function drawBarcode(el) {
  const L = ['0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011']
  const G = L.map((c) => [...c].map((b) => (b === '1' ? '0' : '1')).reverse().join(''))
  const R = L.map((c) => [...c].map((b) => (b === '1' ? '0' : '1')).join(''))
  const PARITY = ['LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL']
  const d = el.dataset.ean.slice(0, 12).split('').map(Number)
  const sum = d.reduce((s, n, i) => s + n * (i % 2 ? 3 : 1), 0)
  d.push((10 - (sum % 10)) % 10)
  let bits = '101'
  for (let i = 1; i <= 6; i++) bits += (PARITY[d[0]][i - 1] === 'L' ? L : G)[d[i]]
  bits += '01010'
  for (let i = 7; i <= 12; i++) bits += R[d[i]]
  bits += '101'
  // Run-length the 95 modules into bars; the strip stretches to the receipt's width.
  const frag = document.createDocumentFragment()
  for (let i = 0; i < bits.length; ) {
    let j = i
    while (bits[j] === bits[i]) j++
    const bar = document.createElement('i')
    bar.style.flex = String(j - i)
    if (bits[i] === '1') bar.style.background = '#111111'
    frag.append(bar)
    i = j
  }
  el.append(frag)
}
document.querySelectorAll('.barcode[data-ean]').forEach(drawBarcode)

// Hero: the stage crossfades between three screens, holding each for six seconds.
const fade = document.querySelector('[data-fade]')
if (fade && !reduce) {
  const imgs = [...fade.querySelectorAll('img')]
  let at = 0
  imgs[0].classList.add('is-on')
  setInterval(() => {
    if (document.hidden) return
    imgs[at].classList.replace('is-on', 'is-off')
    at = (at + 1) % imgs.length
    imgs[at].classList.remove('is-off')
    imgs[at].classList.add('is-on')
  }, 6000)
}

// Screens: choosing a name swaps the picture on the stage and the fact under the list.
const FACTS = {
  till: 'Scan a barcode or tap a product. A bundle takes stock from each item inside it.',
  pay: 'Cash, QRIS, transfer, debit or pay later. Quick cash buttons work out the change.',
  phone: 'The same till on a phone browser. The cart sits in a bar at the bottom.',
  shift: 'The cashier counts the drawer. A difference needs a note before the shift can close.',
  dashboard: 'One day at a glance: profit, sales against last week, stock running low, open shifts.',
  report: 'Every sale of the day, split by payment method, with the day’s expenses.',
  activity: 'Sales, discounts, cancels, returns and drawer differences for each person.',
  catalogue: 'Each variant has its own SKU, barcode, price, cost and stock.',
  site: 'The public site has a demo till: switch the internet off and press pay.',
}
const names = document.querySelectorAll('[data-show]')
const fact = document.querySelector('[data-fact]')
names.forEach((btn) =>
  btn.addEventListener('click', () => {
    const key = btn.dataset.show
    names.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)))
    document.querySelectorAll('[data-screen]').forEach((s) => s.classList.toggle('is-on', s.dataset.screen === key))
    fact.textContent = FACTS[key]
  }),
)

// A cashier's day: the slider moves the till through four stages.
const STAGES = [
  {
    clause: 'First, open the shift with a float',
    note: 'The cashier counts the cash already in the drawer. Every sale and every cash in or out is added to it.',
    net: 'Online',
    sync: null,
  },
  {
    clause: 'Then sell, even with no internet',
    note: 'Each sale is saved on the device and waits in a queue. The cashier keeps serving and the receipts still print.',
    net: 'Offline',
    sync: ['Antre', 'st st-wait'],
  },
  {
    clause: 'Back online, the queue sends itself',
    note: 'Queued sales go to the server once each. A sale sent twice is recognised and stored once, so nothing doubles.',
    net: 'Online',
    sync: ['Terkirim', 'st st-ok'],
  },
  {
    clause: 'Last, count the drawer and close',
    note: 'The system knows what should be in the drawer. The cashier types what is there, and any difference needs a note.',
    net: 'Online',
    sync: null,
  },
]
const range = document.querySelector('[data-range]')
const till = document.querySelector('[data-till]')
const clause = document.querySelector('[data-clause]')
const note = document.querySelector('[data-note]')
const net = document.querySelector('[data-net]')
const stops = document.querySelectorAll('.day-stops li')
function setStage(i) {
  const s = STAGES[i]
  till.dataset.stage = String(i)
  clause.textContent = s.clause
  note.textContent = s.note
  net.textContent = s.net
  if (s.sync) till.querySelectorAll('[data-sync]').forEach((el) => ((el.textContent = s.sync[0]), (el.className = s.sync[1])))
  stops.forEach((li, n) => li.classList.toggle('is-on', n === i))
  range.setAttribute('aria-valuetext', stops[i].textContent)
}
range?.addEventListener('input', () => setStage(Number(range.value)))
stops.forEach((li, n) =>
  li.addEventListener('click', () => {
    range.value = String(n)
    setStage(n)
  }),
)

// Cost per sale: the planned Rp99.000 a month over 30 days of sales.
const sales = document.querySelector('[data-sales]')
const salesOut = document.querySelector('[data-sales-out]')
const cost = document.querySelector('[data-cost]')
function setCost() {
  const n = Number(sales.value)
  salesOut.textContent = String(n)
  cost.textContent = Math.round(99000 / (n * 30)).toLocaleString('id-ID')
}
sales?.addEventListener('input', setCost)

// Launch: the button writes an email with the shop's name and kind.
document.querySelector('[data-launch]')?.addEventListener('submit', (e) => {
  e.preventDefault()
  const form = new FormData(e.currentTarget)
  const shop = String(form.get('shop') || '').trim() || 'my shop'
  const kind = String(form.get('kind'))
  const subject = `Medina POS launch: ${shop}`
  const body = `Hi Fajri,\n\nPlease tell me when Medina POS opens.\n\nShop: ${shop}\nKind: ${kind}\n`
  window.location.href = `mailto:muhafa99@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
})

// Entrances: the parts of each section rise in turn as the section arrives.
if (!reduce && 'IntersectionObserver' in window) {
  const groups = [
    ['.hero-card > :not(.tear):not(.barcode)'],
    ['.screens-index h2', '.screen-names li', '.screen-fact', '.screens-stage'],
    ['.board .tile'],
    ['.day-words', '.day-stage', '.day-control'],
    ['.lineup h2', '.lineup h3', '.lineup tr'],
    ['.cost-top h2', '.cost-control', '.cost-figure', '.cost-note'],
    ['.launch-words h2', '.launch-words p', '.dialog'],
    ['.foot-cols > *'],
  ]
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return
        en.target.classList.add('is-in')
        io.unobserve(en.target)
      }),
    { threshold: 0 },
  )
  for (const selectors of groups) {
    let n = 0
    for (const sel of selectors) {
      document.querySelectorAll(sel).forEach((el) => {
        el.classList.add('rise')
        el.style.setProperty('--d', `${Math.min(n++, 8) * 75}ms`)
        io.observe(el)
      })
    }
  }
}
