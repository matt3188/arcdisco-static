<script setup lang="ts">
import pages from '../../content/pages.json'
const documents = import.meta.glob('../../content/pages/**/*.html', { query: '?raw', import: 'default', eager: true })
const route = useRoute()
const base = useRuntimeConfig().app.baseURL
const path = computed(() => route.path.replace(/\/$/, '') + '/')
const page = computed(() => pages.find(item => item.path === path.value))
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found' })
const content = computed(() => String(documents[`../../content/pages/${page.value?.file}.html`] || '').replace(/(href|src)="\/(?!\/)/g, `$1="${base}`).replace(/url\(["']?\/(?!\/)/g, match => match.replace(/\/$/, base)))
useHead(() => ({ title: page.value?.title, meta: [{ name: 'description', content: page.value?.description }], link: [{ rel: 'canonical', href: `https://matt3188.github.io${base.replace(/\/$/, '')}${path.value}` }] }))
const open = ref(false)
const dialog = ref<HTMLDialogElement>()
const photo = ref({ src: '', alt: '' })
function click(event: MouseEvent) {
  const link = (event.target as Element).closest('.static-gallery a') as HTMLAnchorElement | null
  if (!link) return
  event.preventDefault()
  photo.value = { src: link.href, alt: link.querySelector('img')?.alt || 'A.R.C. Disco event photograph' }
  dialog.value?.showModal()
}
function submit(event: Event) {
  const form = event.target as HTMLFormElement
  if (!form.matches('.enquiry-form')) return
  event.preventDefault()
  if (!form.reportValidity()) return
  const lines = Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input, textarea, select')).filter(input => input.name && input.type !== 'submit' && (input.type !== 'checkbox' || (input as HTMLInputElement).checked)).map(input => `${form.querySelector(`label[for="${input.id}"]`)?.textContent?.trim() || input.name.replaceAll('-', ' ')}: ${input.value}`)
  window.location.href = 'mailto:info@arcdisco.co.uk?subject=' + encodeURIComponent('A.R.C. Disco event enquiry') + '&body=' + encodeURIComponent(lines.join('\n'))
  const status = form.querySelector('.form-status')
  if (status) status.textContent = 'Your email app should open with the enquiry. Please press Send in your email app. If it does not open, email info@arcdisco.co.uk or call 01279 503870.'
}
</script>
<template>
  <div id="layout" :class="{ active: open }" @keydown.esc="open = false">
    <a id="menuLink" href="#menu" class="menu-link" :class="{ active: open }" aria-label="Toggle navigation" :aria-expanded="open" @click.prevent="open = !open"><span /></a>
    <SiteNavigation />
    <main id="main" @click="click" @submit="submit" v-html="content" />
    <dialog ref="dialog" aria-label="Event photograph" @click="event => { if (event.target === dialog) dialog?.close() }"><button @click="dialog?.close()">Close photograph</button><img :src="photo.src || undefined" :alt="photo.alt"></dialog>
  </div>
</template>
