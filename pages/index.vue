<template>
  <div class="index container p-4">
    <div class="grid">
      <div class="col col-12 lg:col-9">
        <h1 class="mb-4">H1 Lorem Ipsum Dolor Sit Amet</h1>
        <h2 class="mb-4">H2 Lorem Ipsum Dolor Sit Amet</h2>
        <h3 class="mb-4">H3 Lorem Ipsum Dolor Sit Amet</h3>
        <h4 class="mb-4">H4 Lorem Ipsum Dolor Sit Amet</h4>
        <h5 class="mb-4">H5 Lorem Ipsum Dolor Sit Amet</h5>
        <h6 class="mb-4">H6 Lorem Ipsum Dolor Sit Amet</h6>
        <p class="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores,
          esse eum ex explicabo facere maiores minus mollitia nulla qui saepe
          tempora veritatis. Dolore ducimus fuga provident sed temporibus. Ab,
          perspiciatis.
        </p>
        <nuxt-link to="/dashboard">
          <Button label="go to dashboard" class="block mb-3" />
        </nuxt-link>
        <nuxt-link to="/dashboard">
          <Button
            label="go to dashboard"
            class="block p-button-outlined mb-3"
          />
        </nuxt-link>
      </div>
      <div class="col col-12 lg:col-3">
        <client-only>
          <Vue3Lottie
            animationLink="/lottie/CircleWave.json"
            width="100%"
            :height="500"
          />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCurrentUser } from '~/composables/states'

const currentUser = useCurrentUser()
const client = useSupabaseClient()
const user = await client.auth.getUser()
const session = await client.auth.getSession()

// check supabase session for logged in user
if ( user?.data?.user ) {
  currentUser.value = user?.data?.user
} else if ( session?.data?.session?.user ) {
  currentUser.value = session?.data?.session?.user
}
</script>

<style lang="scss" scoped>
.lottie-animation-container {
  margin: -70px -70px 0 0;
  opacity: 0.75;
}
</style>