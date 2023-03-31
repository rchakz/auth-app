import { Handlers } from "$fresh/server.ts";
import { Providers } from "deno_grant";
import GithubProfile from "deno_grant/interfaces/profiles/GithubProfile.ts"

import config from "@config";
import denoGrant from "@denoGrant";
import db from "@db";
import ProviderType from "@/constants/ProviderType.ts";

function getGithubAvatar(profile: GithubProfile) {
  return `https://github.com/${profile.login}.png`;
}

// TODO: refatorar p/ quando houver mais de um provider
async function upsertGithubProfile(accessToken: string) {
  const profile = await denoGrant.getProfile(Providers.github, accessToken);
  const socialProfile = await db
    .selectFrom("social_profile")
    .select("provider_id")
    .where("provider_id", "=", profile.id)
    .executeTakeFirst();

  if (socialProfile) {
    console.log("ATUALIZANDO social_profile EXISTENTE", profile)
    await db.updateTable("social_profile")
      .set({
        username: profile.login,
        avatar_url: getGithubAvatar(profile)
      })
      .where("provider_id", "=", profile.id)
      .execute();
  } else {
    console.log("ATUALIZANDO user EXISTENTE")
    const result = await db.transaction().execute(async (trx) => {
      const user = await trx
        .insertInto("user")
        .values({
          display_name: profile.login,
        })
        .returningAll()
        .executeTakeFirst();

      if (user) {
        const socialProfile = await trx
          .insertInto("social_profile")
          .values({
            provider_type: ProviderType.github,
            provider_id: profile.id,
            username: profile.login,
            avatar_url: getGithubAvatar(profile),
            user_id: user.id
          })
          .returningAll()
          .executeTakeFirst();
        if (socialProfile) {
          return {
            user,
            socialProfile
          }
        }
        return null;
      } 
      return null;
    });
    // if (result?.socialProfile && result.user) {
    if (result) {
      console.log("!!! user INSERIDO", result)
      // TODO: emitir um cookie assinado
    }
  }
  // TODO: inserir/atualizar no BD
  
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
