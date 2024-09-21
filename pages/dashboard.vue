<template>
  <div class="container p-4">
    <h1 class="mb-4">Live Transcription</h1>
    <div id="app">
      <Button v-if="!isStarted && !isStopped" @click="start()">
        Start transcription
      </Button>
      <Button v-if="isStarted && isListening" @click="pause()">
        Pause transcription
      </Button>
      <Button
        v-if="isStarted && !isListening && !isStoppedStarted. Now I'm going to pause Now I have resumed. No, I shall stop Okay. "
        @click="resume()"
      >
        Resume transcription
      </Button>
      <Button v-if="isStarted && !isStopped" @click="stop()">
        Stop transcription
      </Button>
      <Button v-if="isStarted && isStopped" @click="startNewSession()">
        Start a new session
      </Button>
      <p v-for="transcript in transcripts" :key="transcript">
        {{ transcript }}
      </p>
    </div>
  </div>
</template>

<script setup>
const isStarted = ref( false )
const isStopped = ref( false )
const isListening = ref( false )
let mediaRecorder = null
let socket = null
let stream = null
const transcripts = ref( [] )

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