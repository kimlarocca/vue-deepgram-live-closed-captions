import deepgram from '@deepgram/sdk';

const client = deepgram.createClient(process.env.DEEPGRAM_API_KEY);

const getTempApiKey = async (projectId: any) => {
  const { result, error } = await client.manage.createProjectKey(projectId, {
    comment: "short lived",
    scopes: ["usage:write"],
    time_to_live_in_seconds: 20,
  });

  if (error) {
    throw error;
  }
  return result.key;
};

const getProjectId = async () => {
  const { result, error } = await client.manage.getProjects();

  if (error) {
    throw error;
  }

  return result.projects[0].project_id;
};


export default defineEventHandler(async (event) => {
    try {
      const projectId = await getProjectId();
      const tempApiKey = await getTempApiKey(projectId);
      return tempApiKey;
    } catch (error: any) {
      return createError({
        statusCode: 500,
        statusMessage: error.message,
      });
    }
  });
  
  