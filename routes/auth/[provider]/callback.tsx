import { Handlers } from "$fresh/server.ts";
import { Providers } from "deno_grant";

import config from "@config";
import denoGrant from "@denoGrant";

// TODO: refatorar p/ quando houver mais de um provider
async function upsertGithubProfile(accessToken: string) {
  const profile = await denoGrant.getProfile(Providers.github, accessToken);
  // TODO: inserir/atualizar profile e user no DB
  return Response.json(profile);
}

export const handler: Handlers = {
  async GET(request, ctx) {
    const providerType = ctx.params.provider.toLowerCase();
    switch (providerType) {
      case Providers.github: {
        const tokens = await denoGrant.getToken(Providers.github, request.url);
        if (tokens) {
          return upsertGithubProfile(tokens.accessToken);
        }
      }
    }
    // TODO: mostrar mensagem de erro ao invés de um redirect instantaneo
    return Response.redirect(config.base_url);
  },
};

// // console.log(provider)
// if (provider) {
//   // console.log(request)
//   const url = new URL(request.url);
//   // TODO: PR lib com tipos
//   // console.log(url)
//   const userProfile = await provider.code.processAuth(url) as {
//     id: number;
//     username: string;
//     avatar: string;
//   };
//   let socialProfile = await SocialProfile
//     .where({
//       provider_type: providerType,
//       provider_id: userProfile.id,
//     }).first();
//   if (!socialProfile) {
//     // TODO: rodar em transaction...
//     // await db.transaction(async () => {
//     const user = await User.create({
//       display_name: userProfile.username,
//     });
//     socialProfile = await SocialProfile.create({
//       // user_id: user.id,  // ??? pq ñ posso especificar
//       user_id: Number(user.id),
//       provider_type: providerType,
//       provider_id: userProfile.id,
//       username: userProfile.username,
//       avatar_url: `https://github.com/${userProfile.username}.png`, // TODO: talvez formatar isso no front...
//     });
//     // });

//     return Response.json(socialProfile);
//   }
//   // TODO: inserir/atualizar no BD
//   // TODO: emitir um cookie assinado
//   return Response.json(userProfile);
// }