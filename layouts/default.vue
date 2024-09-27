<template>
  <div class="default Swift">
    <the-header />
    <main>
      <NuxtPage />
    </main>
    <the-footer />
  </div>
</template>

<script setup>
const route = useRoute()

useHead( {
  bodyAttrs: {
    class: `${ route.name }`
  }
} )
</script>

<style lang="scss">
.default {
  min-height: 100vh;
}
</style>
