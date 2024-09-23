<template>
  <div class="login">
    <h1 class="mb-4 flex align-items-center">Log in</h1>
    <supabase-login-with-google class="mb-4" />
    <p class="mb-3">Or sign in with email and password:</p>
    <supabase-login-with-email class="mb-2" />
    <p class="small mb-4 text-right">
      <nuxt-link to="/forgot-password">Forgot Password?</nuxt-link>
    </p>
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