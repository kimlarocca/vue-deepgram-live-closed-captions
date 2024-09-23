<template>
  <div class="signup container p-4">
    <Html lang="en">
      <Head>
        <Title>Swift Captions! Sign Up</Title>
      </Head>
    </Html>
    <h1 class="mb-3">Get started for free</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, esse
      eum ex explicabo facere maiores minus mollitia nulla qui saepe tempora
      veritatis. Dolore ducimus fuga provident sed temporibus. Ab, perspiciatis.
    </p>
    <divider class="my-6 w-2" />
    <h4 class="mb-4">Fill out the form below to register</h4>
    <supabase-signup-with-email />
    <divider class="mt-5 mb-4 w-2" />
    <p class="mb-3">Or sign in with google:</p>
    <supabase-login-with-google />
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

onMounted( () => {
  if ( currentUser.value ) {
    window.location.href = '/dashboard'
  }
} )
</script>
