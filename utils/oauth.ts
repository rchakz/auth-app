import { GitHubClient } from "denoauth/mod.ts";
import config from "@config";

const GitHub = new GitHubClient({
  clientId: config.oauth.github.client_id,
  clientSecret: config.oauth.github.client_secret,
  tokenUri: "https://github.com/login/oauth/access_token",
  redirect: `${config.base_url}/auth/github/callback`, // The redirect uri is added in the GitHub OAuth developer settings
  // TODO: descobrir scopes
  // TODO: talvez email?
  scope: "read:user",
});

// console.log(GitHub);
// GitHub.code.createLink();
// export default GitHub;
// console.log(GitHub.config.redirect);

// TODO: atualizar tipo para incluir todas possibilidades de clientes oauth
export default new Map<string, GitHubClient>([
  ["github", GitHub],
]);
