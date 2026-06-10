const reqresApiKey = () => process.env.REQRES_API_KEY ?? process.env.API_KEY;
const reqresEnv = () => process.env.REQRES_ENV ?? process.env.ENV;

export const HEADERS = {
  JSON: () => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept':       'application/json',
    };

    const apiKey = reqresApiKey();
    if (apiKey) {
      headers['x-api-key'] = apiKey;
    }

    const environment = reqresEnv();
    if (environment) {
      headers['X-Reqres-Env'] = environment;
    }

    return headers;
  },
};
