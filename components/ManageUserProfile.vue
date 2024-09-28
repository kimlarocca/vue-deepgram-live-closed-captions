<template>
  <div v-if="profile && profile.length > 0">
    <template v-if="profile[0].paid_user">
      <p class="mb-3">
        Subscription Plan: <span class="font-bold">Unlimited</span>
      </p>
    </template>
    <template v-else>
      <p class="mb-1">Subscription Plan: <span class="font-bold">Free</span></p>
      <p class="mb-3">
        Free Minutes Used:
        <span class="font-bold">{{ profile[0].free_minutes_used }} / 200</span>
      </p>
    </template>
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
const successMessage = ref( false )

// get the profile for the logged in user
let { data } = await supabase
  .from( 'profiles' )
  .select( '*' )
  .eq( 'id', currentUser.value.id )
  .limit( 1 )
if ( data ) {
  profile.value = data
  fullName.value = data[ 0 ]?.full_name
}

const updateProfile = async () => {
  successMessage.value = false
  const { error } = await supabase
    .from( 'profiles' )
    .upsert( {
      id: currentUser.value.id,
      updated_at: new Date().toISOString(),
      full_name: fullName.value,
    } )
    .match( { id: currentUser.value.id } )
  if ( error ) {
    console.log( 'updateProfile error', error )
  } else {
    successMessage.value = true
  }
}
</script>
