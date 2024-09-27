<template>
  <div class="container p-4">
    <Html lang="en">
      <Head>
        <Title>Swift Captions! Dashboard</Title>
      </Head>
    </Html>
    <transition name="slide-fade">
      <div
        v-if="fullScreen"
        class="full-screen p-4"
        :class="currentUserProfile?.theme"
      >
        <div v-if="!hideCaptions" class="mt-5 captions">
          <p
            v-for="transcript in transcripts"
            :key="transcript"
            :class="currentUserProfile?.theme"
          >
            {{ transcript }}
          </p>
        </div>
      </div>
    </transition>
    <div v-if="!hideCaptions" class="mt-5 captions">
      <p v-for="transcript in transcripts" :key="transcript">
        {{ transcript }}
      </p>
    </div>
    <div class="controls">
      <Button
        v-if="!isStarted && !isStopped"
        @click="start()"
        icon="pi pi-play"
        class="p-button-rounded"
        v-tooltip.top="'Start'"
      />
      <Button
        v-if="isStarted && isListening"
        @click="pause()"
        icon="pi pi-pause"
        class="p-button-rounded"
        v-tooltip.top="'Pause'"
      />
      <Button
        v-if="isStarted && !isListening && !isStoppedStarted"
        @click="resume()"
        icon="pi pi-play"
        class="p-button-rounded"
        v-tooltip.top="'Resume'"
      />
      <Button
        v-if="isStarted && !isStopped"
        @click="stop()"
        icon="pi pi-stop"
        class="p-button-rounded ml-2"
        v-tooltip.top="'Stop Session'"
      />
      <Button
        v-if="isStarted && isStopped"
        @click="startNewSession()"
        icon="pi pi-refresh"
        class="p-button-rounded ml-2"
      />
      <Button
        v-if="!fullScreen"
        @click="fullScreen = true"
        icon="pi pi-window-maximize"
        class="p-button-rounded ml-2"
        v-tooltip.top="'Enter Full Screen'"
      />
      <Button
        v-if="fullScreen"
        @click="fullScreen = false"
        icon="pi pi-window-minimize"
        class="p-button-rounded ml-2"
        v-tooltip.top="'Exit Full Screen'"
      />
      <Button
        v-if="hideCaptions"
        @click="hideCaptions = false"
        icon="pi pi-eye-slash"
        class="p-button-rounded ml-2"
        v-tooltip.top="'Show Captions'"
      />
      <Button
        v-if="!hideCaptions"
        @click="hideCaptions = true"
        icon="pi pi-eye"
        class="p-button-rounded ml-2"
        v-tooltip.top="'Hide Captions'"
      />
      <Button
        @click="navigateTo('/settings')"
        icon="pi pi-cog"
        class="p-button-rounded ml-2"
        v-tooltip.top="'Theme Settings'"
      />
    </div>
  </div>
</template>

<script setup>
definePageMeta( {
  middleware: 'auth',
} )

const currentUserProfile = useCurrentUserProfile()
const isStarted = ref( false )
const isStopped = ref( false )
const isListening = ref( false )
const fullScreen = ref( false )
const hideCaptions = ref( false )
let mediaRecorder = null
let socket = null
let stream = null
const transcripts = ref( [ 'hello this is a test' ] )

const start = async () => {
  transcripts.value = []
  isStarted.value = true
  isListening.value = true
  socket.onopen = startStreaming()
  socket.onerror = ( error ) => console.error( 'WebSocket error:', error )
  socket.onmessage = ( event ) => {
    const message = event.data;
    handleResponse( message )
  };
}

const pause = async () => {
  isListening.value = false
  mediaRecorder.pause()
}

const resume = async () => {
  isListening.value = true
  mediaRecorder.resume()
}

const stop = async () => {
  isListening.value = false
  isStopped.value = true
  mediaRecorder.stop()
  socket.close()
}

const startStreaming = async () => {
  mediaRecorder.start( 200 );

  mediaRecorder.addEventListener( 'dataavailable', ( event ) => {
    // Handle the recorded data
    if ( event.data.size > 0 && socket.readyState == 1 ) {
      socket.send( event.data )
    }
  } )

  mediaRecorder.addEventListener( 'stop', ( event ) => {
    console.log( 'Recorder stopped: ', event )
  } )

  mediaRecorder.addEventListener( 'error', ( event ) => {
    console.error( 'Recorder error:', event.error );
  } )
}

const handleResponse = ( message ) => {
  const received = JSON.parse( message )
  const transcript = received?.channel?.alternatives?.[ 0 ]?.transcript
  if ( transcript ) {
    transcripts.value.push( transcript )
  }
}

const startNewSession = async () => {
  // there's probably a better way to do this
  location.reload()
}

onMounted( async () => {
  // why isn't this working!
  // const deepgramKey = await useFetch( '/api/deepgram/' )
  // await nextTick()
  // console.log( "deepgramKey", deepgramKey )
  const deepgramKey = 'deepgram_key_goes_here'
  const deepgramUrl = 'wss://api.deepgram.com/v1/listen?language=en-US'

  socket = new WebSocket( deepgramUrl, [ 'token', deepgramKey ] )
  stream = await navigator.mediaDevices.getUserMedia( { audio: true } ).catch( error => alert( error ) )

  if ( !MediaRecorder.isTypeSupported( 'audio/webm' ) ) {
    alert( 'Sorry! You are using an unsupported browser.' )
  }

  mediaRecorder = new MediaRecorder( stream, { mimeType: 'audio/webm' } )
} )
</script>

<style lang="scss">
.dashboard footer {
  display: none;
}
.captions {
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
}
.captions p {
  font-size: 7rem;
  font-weight: 500;
  line-height: 1.5;
  margin: auto;
}
.controls {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  background: var(--black);
  .p-button-rounded {
    border: 1px solid var(--white);
    &:hover {
      border: 1px solid var(--white);
    }
  }
}
.full-screen {
  z-index: 1000;
  position: fixed;
  top: 0;
  padding-bottom: 70px !important;
  left: 0;
  right: 0;
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>