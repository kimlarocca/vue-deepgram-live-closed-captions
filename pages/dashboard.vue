<template>
  <div class="container p-4">
    <h1 class="mb-4">Live Transcription</h1>
    <div id="app">
      <Button @click="begin">Begin transcription</Button>
      <p v-for="transcript in transcripts" :key="transcript">
        {{ transcript }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";

// not sure if this is safe to use?
const { data } = await useFetch( '/api/deepgram/' );

const deepgram = createClient( data.value );
const dgConnection = deepgram.listen.live( { model: "nova" } );
const transcripts = ref( [] )

onMounted( async () => {
  const stream = await navigator.mediaDevices.getUserMedia( { audio: true } ).catch( error => alert( error ) )
  if ( !MediaRecorder.isTypeSupported( 'audio/webm' ) ) {
    alert( 'Unsupported browser' )
  }
  const mediaRecorder = new MediaRecorder( stream, { mimeType: 'audio/webm' } )

  dgConnection.on( LiveTranscriptionEvents.Open, () => {
    console.log( 'dgConnection LiveTranscriptionEvents' )
    dgConnection.on( LiveTranscriptionEvents.Transcript, ( data ) => {
      console.log( data );
    } );

    mediaRecorder.addEventListener( 'got-some-audio', event => {
      console.log( 'mediaRecorder event', event )
      if ( event.data?.size > 0 && dgConnection.readyState == 1 ) {
        console.log( 'mediaRecorder ready' )
        dgConnection.send( event.data )
      }
      mediaRecorder.value.start( 250 )
    } )

  } );
} )
</script>