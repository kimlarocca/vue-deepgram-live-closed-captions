// Generated by nitro
import type { Serialize, Simplify } from 'nitropack'
declare module 'nitropack' {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
  interface InternalApi {
    '/api/deepgram': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/deepgram.get').default>>>>
    }
    '/api/sendgrid': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/sendgrid.post').default>>>>
    }
    '/__nuxt_error': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/nuxt/dist/core/runtime/nitro/renderer').default>>>>
    }
    '/api/_supabase/session': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/@nuxtjs/supabase/dist/runtime/server/api/session').default>>>>
    }
  }
}
export {}