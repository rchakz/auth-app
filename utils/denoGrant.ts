import DenoGrant, { Providers } from "deno_grant";

import config from "@config";

// Create a DenoGrant instance with your app's base uri and any number of strategies:
const denoGrant = new DenoGrant({
  base_uri: config.base_url,
  strategies: [{
    provider: Providers.github,
    client_id: config.oauth.github.client_id,
    client_secret: config.oauth.github.client_secret,
    redirect_path: "/auth/github/callback",
    scope: "read:user",
  }],
});

export default denoGrant;

export const ProvidersMap = new Map<string, Providers>(
  Object.entries(Providers),
);
