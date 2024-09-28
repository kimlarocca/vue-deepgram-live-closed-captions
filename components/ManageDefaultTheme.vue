<template>
  <div v-if="profile && profile.length > 0">
    <h4 class="mb-4">Full Screen Theme</h4>
    <p class="mb-3">
      Update the default theme for your full screen captions display:
    </p>
    <div class="grid">
      <div class="col col-12 md:col-6 lg:col-2">
        <div @click="updateProfile('Swift')" class="clickable Swift p-3 mb-3">
          <h3>
            Swift
            <i v-if="theme === 'Swift'" class="pi pi-check" />
          </h3>
        </div>
      </div>
      <div class="col col-12 md:col-6 lg:col-2">
        <div @click="updateProfile('Light')" class="clickable Light p-3 mb-3">
          <h3>
            Light
            <i v-if="theme === 'Light'" class="pi pi-check" />
          </h3>
        </div>
      </div>
      <div class="col col-12 md:col-6 lg:col-2">
        <div @click="updateProfile('Dark')" class="clickable Dark p-3 mb-3">
          <h3>Dark <i v-if="theme === 'Dark'" class="pi pi-check" /></h3>
        </div>
      </div>
      <div class="col col-12 md:col-6 lg:col-2">
        <div
          @click="updateProfile('Contrast')"
          class="clickable Contrast p-3 mb-3"
        >
          <h3>
            Contrast <i v-if="theme === 'Contrast'" class="pi pi-check" />
          </h3>
        </div>
      </div>
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
.Swift,
.Light,
.Contrast {
  border: 1px solid var(--black);
}
</style>