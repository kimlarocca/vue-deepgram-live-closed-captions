<template>
  <header class="container p-4">
    <div class="flex align-items-center justify-content-between">
      <nuxt-link to="/" class="plain">
        <Logo />
      </nuxt-link>
      <div class="flex align-items-center">
        <template v-if="currentUserProfile">
          <nuxt-link to="/dashboard" class="plain mr-2">
            <Button label="dashboard" class="block p-button-outlined" />
          </nuxt-link>
          <nuxt-link
            v-if="currentUserProfile.avatar_url"
            to="/settings"
            class="plain white clickable ml-2"
            aria-label="manage profile"
          >
            <Avatar
              :image="currentUserProfile.avatar_url"
              shape="circle"
              size="large"
              aria-label="user avatar image"
            />
          </nuxt-link>
          <nuxt-link
            v-else
            to="/settings"
            class="plain white clickable ml-2"
            aria-label="manage profile"
          >
            <Avatar
              shape="circle"
              icon="pi pi-user"
              size="large"
              aria-label="user avatar image"
            />
          </nuxt-link>
        </template>
        <template v-else>
          <nuxt-link to="/signup" class="plain mr-2">
            <Button label="sign up" class="block" />
          </nuxt-link>
          <nuxt-link @click="showLoginModal = true" class="plain">
            <Button label="login" class="block p-button-outlined" />
          </nuxt-link>
        </template>
      </div>
    </div>
  </header>
  <Dialog
    v-model:visible="showLoginModal"
    modal
    :style="{ width: '350px' }"
    position="topright"
    :dismissable-mask="true"
  >
    <Login />
  </Dialog>
</template>

<script setup>
const currentUserProfile = useSupabaseUser()
const showLoginModal = ref( false )
</script>

<style lang="scss" scoped>
header .logo {
  margin-bottom: -5px;
}
</style>