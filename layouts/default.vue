<template>
  <div class="default">
    <the-header />
    <main>
      <NuxtPage />
    </main>
    <the-footer />
  </div>
</template>

<script setup>
useHead( {
  bodyAttrs: {
    class: 'default',
  },
} )
</script>

<style lang="scss">
.default {
  min-height: 100vh;
  background: hsla(140, 39%, 78%, 1);
  background: linear-gradient(
    45deg,
    #b1ddc0 11%,
    #ffd1e6 48%,
    #cce1ff 71%,
    hsla(0, 0%, 100%, 1) 100%
  );
  background: -moz-linear-gradient(
    45deg,
    hsla(140, 39%, 78%, 1) 11%,
    hsla(333, 100%, 91%, 1) 48%,
    hsla(215, 100%, 90%, 1) 71%,
    hsla(0, 0%, 100%, 1) 100%
  );
  background: -webkit-linear-gradient(
    45deg,
    hsla(140, 39%, 78%, 1) 11%,
    hsla(333, 100%, 91%, 1) 48%,
    hsla(215, 100%, 90%, 1) 71%,
    hsla(0, 0%, 100%, 1) 100%
  );
}
</style>
