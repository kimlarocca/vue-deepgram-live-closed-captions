export default defineEventHandler(() => {
    try {
      return useRuntimeConfig().DEEPGRAM_API_KEY;
    } catch (error) {
      return createError({
        statusCode: 500,
        statusMessage: 'Something went wrong with deepgram initialization.',
      });
    }
  });
  