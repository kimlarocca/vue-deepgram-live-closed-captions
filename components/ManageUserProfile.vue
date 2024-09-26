<template>
  <div v-if="profile && profile.length > 0">
    <p class="mb-3">
      Email Address: <span class="font-bold">{{ currentUser?.email }}</span>
    </p>
    <div class="flex align-items-center mb-4">
      <p class="mr-2">Name:</p>
      <div class="p-inputgroup">
        <InputText
          v-model="fullName"
          placeholder="Name"
          @change="updateProfile"
          class="width400"
        />
        <Button icon="pi pi-save" @click="updateProfile" />
      </div>
    </div>
    <divider class="my-6 w-2" />
    <h4 class="mb-4">Live Captions Theme</h4>
    <p class="mb-3">Please select a theme for your captions display:</p>
    <Dropdown
      class="width400"
      v-model="theme"
      :options="themes"
      placeholder="Select a theme"
      @change="updateProfile"
    />
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
const supabase = useSupabaseClient()

const fullName = ref( null )
const profile = ref( [] )
const theme = ref( null )
const successMessage = ref( false )

const themes = ref( [
  'Swift', 'Light', 'Dark', 'High Contrast'
] )

// get the profile for the logged in user
let { data } = await supabase
  .from( 'profiles' )
  .select( '*' )
  .eq( 'id', currentUser.value.id )
  .limit( 1 )
if ( data ) {
  profile.value = data
  fullName.value = data[ 0 ]?.full_name
  theme.value = data[ 0 ]?.theme
}

const updateProfile = async () => {
  successMessage.value = false
  const { error } = await supabase
    .from( 'profiles' )
    .upsert( {
      id: currentUser.value.id,
      updated_at: new Date().toISOString(),
      full_name: fullName.value,
      theme: theme.value,
    } )
    .match( { id: currentUser.value.id } )
  if ( error ) {
    console.log( 'updateProfile error', error )
  } else {
    successMessage.value = true
  }
}
</script>
