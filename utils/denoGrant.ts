import DenoGrant, { Providers } from "deno_grant";
// import { deno_grant } from "@/deps.ts"

import config from "@config";

// Create a DenoGrant instance with your app's base uri and any number of strategies:
const denoGrant = new DenoGrant({
  base_uri: "http://localhost:8000",
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

// const GitHub = new GitHubClient({
//   clientId: config.oauth.github.client_id,
//   clientSecret: config.oauth.github.client_secret,
//   tokenUri: "https://github.com/login/oauth/access_token",
//   redirect: `${config.base_url}/auth/github/callback`, // The redirect uri is added in the GitHub OAuth developer settings
//   // TODO: descobrir scopes
//   // TODO: talvez email?
//   scope: "read:user",
// });

// // console.log(GitHub);
// // GitHub.code.createLink();
// // export default GitHub;
// // console.log(GitHub.config.redirect);

// // TODO: atualizar tipo para incluir todas possibilidades de clientes oauth
// export default new Map<string, GitHubClient>([
//   ["github", GitHub],
// ]);
