<template>
  <footer class="container p-4">
    <Divider class="mb-5" />
    <p>Copyright © {{ currentYear }} SwiftCaptions.com. All Rights Reserved.</p>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style lang="scss" scoped>
footer p {
  font-size: var(--font-size-5);
}
</style>