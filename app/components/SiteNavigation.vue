<script setup lang="ts">
const base = useRuntimeConfig().app.baseURL
const url = (path: string) => base + path.replace(/^\//, '')
const links = [
  { path: '/', label: 'Home' },
  { path: '/functions/', label: 'Why Choose Us?', children: [
    { path: '/functions/weddings/', label: 'Weddings' },
    { path: '/functions/parties/', label: 'Parties' },
    { path: '/functions/professional-photo-booth-hire/', label: 'Photo Booth Hire' },
    { path: '/functions/mood-lighting/', label: 'Mood Lighting' }
  ] },
  { path: '/services/', label: 'Services' }, { path: '/contact/', label: 'Contact' },
  { path: '/gallery/', label: 'Picture Gallery' }, { path: '/testimonials/', label: 'Testimonials' },
  { path: '/faqs/', label: 'FAQs' }
]
const route = useRoute()
const active = (path: string) => route.path.replace(/\/$/, '') === path.replace(/\/$/, '')
</script>
<template>
  <div id="menu">
    <div class="pure-menu pure-menu-open">
      <div class="logo"><a :href="url('/')">A.R.C Disco</a></div>
      <ul id="menu-main-menu" class="menu">
        <li v-for="link in links" :key="link.path" class="menu-item" :class="{ 'current-menu-item': active(link.path), 'menu-item-has-children': link.children }">
          <a :href="url(link.path)" :aria-current="active(link.path) ? 'page' : undefined">{{ link.label }}</a>
          <ul v-if="link.children" class="sub-menu"><li v-for="child in link.children" :key="child.path" class="menu-item" :class="{ 'current-menu-item': active(child.path) }"><a :href="url(child.path)" :aria-current="active(child.path) ? 'page' : undefined">{{ child.label }}</a></li></ul>
        </li>
      </ul>
    </div>
    <div class="stay_updated">
      <a class="button-large pure-button book-now--button" :href="url('/contact/')">Book now</a>
      <p class="telephone">T: <a href="tel:+441279503870">01279 503870</a></p>
      <ul class="social"><li><span>Check us out on</span><a href="https://www.facebook.com/A.R.C.MobileDisco" rel="noopener noreferrer" target="_blank"><img alt="A.R.C Disco on Facebook" loading="lazy" :src="url('/assets/ea9b8ca2739031d4.png')"></a></li></ul>
      <p class="copyrght">Copyright © {{ new Date().getFullYear() }} A.R.C Disco.</p>
      <a :href="url('/terms-conditions/')" style="font-size: .8rem; text-decoration: none">Terms &amp; Conditions</a>
    </div>
  </div>
</template>
