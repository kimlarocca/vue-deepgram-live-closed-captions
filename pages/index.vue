<template>
  <div class="index container p-4">
    <div class="grid mb-8">
      <div class="col col-8 md:col-6 flex align-items-center">
        <div>
          <h1 class="mb-4">From zero to live captions in minutes</h1>
          <h2 class="mb-5">
            Display instant captions on your presentation, smart tv, or on a
            public link for your viewers
          </h2>
          <nuxt-link to="/signup" class="plain mr-2">
            <Button
              label="get started for free"
              class="block"
              icon="pi pi-arrow-right"
            />
          </nuxt-link>
        </div>
      </div>
      <div class="col col-4 md:col-6">
        <client-only>
          <Vue3Lottie
            animationLink="/lottie/CircleWave.json"
            :width="700"
            :speed="0.5"
          />
        </client-only>
      </div>
    </div>
    <div class="grid">
      <div class="col col-12 lg:col-4">
        <div class="card p-4 h-full">
          <div class="flex align-items-center">
            <div class="rocket-container">
              <client-only>
                <Vue3Lottie
                  animationLink="../lottie/Rocket.json"
                  :height="75"
                  class="rocket"
                />
              </client-only>
            </div>
            <h6>easy to setup</h6>
          </div>
          <h3 class="mb-3 mt-3">No Install Needed</h3>
          <p class="mb-4">
            You can run Swift Captions from any browser without installing any
            software or apps.
          </p>
          <h5>
            <nuxt-link to="/signup" class="plain flex align-items-center">
              try it now <i class="pi pi-arrow-right ml-2" />
            </nuxt-link>
          </h5>
        </div>
      </div>
      <div class="col col-12 lg:col-4">
        <div class="card p-4 h-full">
          <div class="flex align-items-center">
            <div class="speech-bubble-container">
              <client-only>
                <Vue3Lottie
                  animationLink="../lottie/SpeechBubble.json"
                  :height="45"
                  class="speech-bubble"
                />
              </client-only>
            </div>
            <h6>works anywhere</h6>
          </div>
          <h3 class="mb-3 mt-3">Display Your Captions</h3>
          <p class="mb-4">
            You can display Swift Captions on your presentation app, smart tv,
            or directly on your viewers' devices.
          </p>
          <h5>
            <nuxt-link to="/signup" class="plain flex align-items-center">
              try it now <i class="pi pi-arrow-right ml-2" />
            </nuxt-link>
          </h5>
        </div>
      </div>
      <div class="col col-12 lg:col-4">
        <div class="card p-4 h-full">
          <div class="flex align-items-center">
            <div class="link-animation-container">
              <client-only>
                <Vue3Lottie
                  animationLink="../lottie/Link.json"
                  :height="80"
                  class="link-animation"
                />
              </client-only>
            </div>
            <h6>easy to share</h6>
          </div>
          <h3 class="mb-3 mt-3">It's More Accessible</h3>
          <p class="mb-4">
            Share your public link for your viewers to access captions on their
            personal devices.
          </p>
          <h5>
            <nuxt-link to="/signup" class="plain flex align-items-center">
              try it now <i class="pi pi-arrow-right ml-2" />
            </nuxt-link>
          </h5>
        </div>
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
  @media all and (max-width: 767px) {
    height: 400px;
    width: 400px;
  }
}
h1 {
  font-size: 2.25rem;
  @media all and (min-width: 768px) {
    font-size: 3rem;
  }
  @media all and (min-width: 1199px) {
    font-size: 4.5rem;
  }
}
h2 {
  @media all and (min-width: 768px) {
    font-size: 1.25rem;
  }
  @media all and (min-width: 999px) {
    font-size: 1.5rem;
  }
  @media all and (min-width: 1199px) {
    font-size: 1.75rem;
  }
}

.rocket-container,
.speech-bubble-container,
.link-animation-container {
  height: 50px;
  width: 50px;
  margin-top: -10px;
  position: relative;
}
.rocket {
  overflow: visible;
  position: absolute;
  left: -28px;
  top: -8px;
  width: 100px;
}
.speech-bubble {
  overflow: visible;
  position: absolute;
  left: -33px;
  top: 7px;
  width: 100px;
}
.link-animation {
  overflow: visible;
  position: absolute;
  left: -36px;
  top: -10px;
  width: 100px;
}
</style>