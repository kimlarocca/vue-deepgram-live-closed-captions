<template>
  <div v-if="profile && profile.length > 0">
    <h4 class="mb-4">Full Screen Theme</h4>
    <p class="mb-3">
      Update the default theme for your full screen captions display:
    </p>
    <div @click="updateProfile('Swift')" class="clickable Swift p-3 mb-3">
      <h3>Swift</h3>
    </div>
    <div @click="updateProfile('Light')" class="clickable Light p-3 mb-3">
      <h3>Light</h3>
    </div>
    <div @click="updateProfile('Dark')" class="clickable Dark p-3 mb-3">
      <h3>Dark</h3>
    </div>
    <div @click="updateProfile('Contrast')" class="clickable Contrast p-3 mb-3">
      <h3>High Contrast</h3>
    </div>
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
const currentUser = useSupabaseUser()
const emit = defineEmits( [ 'themeUpdated' ] )
const supabase = useSupabaseClient()

const profile = ref( [] )
const theme = ref( 'Swift' )
const successMessage = ref( false )

// get the profile for the logged in user
let { data } = await supabase
  .from( 'profiles' )
  .select( '*' )
  .eq( 'id', currentUser.value?.id )
  .limit( 1 )
if ( data ) {
  profile.value = data
  theme.value = data[ 0 ]?.theme
}

const updateProfile = async ( themeName ) => {
  theme.value = themeName
  successMessage.value = false
  const { error } = await supabase
    .from( 'profiles' )
    .upsert( {
      id: currentUser.value?.id,
      updated_at: new Date().toISOString(),
      theme: theme.value,
    } )
    .match( { id: currentUser.value?.id } )
  if ( error ) {
    console.log( 'updateProfile error', error )
  } else {
    successMessage.value = true
    emit( 'themeUpdated', theme.value )
  }
}
</script>

<style lang="scss" scoped>
.Light {
  border: 1px solid var(--black);
}
</style>