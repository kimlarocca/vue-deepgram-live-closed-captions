<template>
  <div v-if="profile && profile.length > 0" class="settings container p-4">
    <Html lang="en">
      <Head>
        <Title>Swift Captions! Account Settings</Title>
      </Head>
    </Html>
    <h1 class="mb-4">Account Settings</h1>
    <supabase-upload-image :image="avatarImage || ''" class="mb-5" />
    <manage-user-profile />
  </div>
  <div id="password" class="container-white p-4 mb-4">
    <supabase-reset-password />
  </div>
  <div id="delete" class="container-white p-4 mb-4">
    <h4 class="mb-4">Delete Account</h4>
    <p>
      Please <a href="mailto:help@cuetip.com">contact us</a> if you wish to
      delete your account.
    </p>
  </div>
  <div class="changes-saved-toast">
    <Message
      v-if="successMessage"
      class="mb-4"
      severity="success"
      :closable="false"
      :sticky="false"
    >
      Your changes have been saved.
    </Message>
  </div>
</template>

<script setup>
definePageMeta( {
  middleware: 'auth',
} )

const currentUser = useSupabaseUser()
const supabase = useSupabaseClient()
const route = useRoute()

const avatarImage = ref( null )
const hash = ref( null )
const profile = ref( [] )
const successMessage = ref( false )
const userType = ref( null )

onMounted( () => {
  // set hash name
  hash.value = route.hash
  // if hash exists, scroll down to that id
  if ( window.location.hash ) {
    const element = document.getElementById( window.location.hash.slice( 1 ) )
    if ( element ) {
      element.scrollIntoView()
      hash.value = window.location.hash
    }
  }
} )

// watch for route.hash changes
watch(
  () => route.hash,
  ( newVal ) => {
    hash.value = newVal
  }
)

// get the profile for the logged in user
let { data } = await supabase
  .from( 'profiles' )
  .select( '*' )
  .eq( 'id', currentUser.value?.id )
  .limit( 1 )
if ( data ) {
  profile.value = data
  avatarImage.value = data[ 0 ]?.avatar_url
  userType.value = data[ 0 ]?.user_type
}
</script>

<style lang="scss">
.settings {
  position: relative;
}
.settings nav {
  a,
  a:visited,
  a:active {
    color: var(--gray);
    font-weight: 500;
    &.active,
    &:hover {
      color: var(--purple);
    }
  }
}
</style>
