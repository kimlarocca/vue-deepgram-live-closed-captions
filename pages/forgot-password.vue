<template>
  <div class="forgot-password container p-4">
    <Html lang="en">
      <Head>
        <Title>Swift Captions! Forgot Password</Title>
      </Head>
    </Html>
    <h1 class="mb-3">Forgot Your Password?</h1>
    <h2 class="mb-3">Sign in with a magic link</h2>
    <p>
      Enter the email address you used when you joined cuetip and we'll send you
      a magic link you can use to sign in. Once you are logged in, you may reset
      your password.
    </p>
    <Divider class="mb-4 pt-6 w-4 lg:w-2" />
    <supabase-login-with-magic-link />
  </div>
</template>
