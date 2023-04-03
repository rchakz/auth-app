import { Handlers } from "$fresh/server.ts";
import { Providers } from "deno_grant";
import GithubProfile from "deno_grant/interfaces/profiles/GithubProfile.ts";
import { squishy_cookies } from "@/deps.ts";
import config from "@config";
import denoGrant from "@denoGrant";
import db from "@db";
import ProviderType from "@/constants/ProviderType.ts";

function getGithubAvatar(profile: GithubProfile) {
  return `https://github.com/${profile.login}.png`;
}

// TODO: refatorar p/ quando houver mais de um provider
async function upsertGithubProfile(request: Request, accessToken: string) {
  const profile = await denoGrant.getProfile(Providers.github, accessToken);
  const socialProfile = await db
    .selectFrom("social_profile")
    .select(["provider_id", "user_id"])
    .where("provider_id", "=", profile.id)
    .executeTakeFirst();
  let id = "";

  // console.log("socialProfile:", socialProfile);

  if (socialProfile) {
    // console.log("ATUALIZANDO social_profile EXISTENTE", profile)
    id = socialProfile.user_id.toString();
    await db
      .updateTable("social_profile")
      .set({
        username: profile.login,
        avatar_url: getGithubAvatar(profile),
        updated_at: new Date(),
      })
      .where("provider_id", "=", profile.id)
      .execute();
  } else {
    // console.log("INSERINDO user")
    const result = await db.transaction().execute(async (trx) => {
      // throw new Error("PLAU");
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
            user_id: user.id,
          })
          .returningAll()
          .executeTakeFirst();
        if (socialProfile) {
          return {
            user,
            socialProfile,
          };
        }
        return null;
      }
      return null;
    });
    // if (result?.socialProfile && result.user) {
    if (result) {
      // console.log("USER INSERIDO!!!", result);
      id = result.user.id.toString();
    }
    // else {
    //   console.log("ERRO, NENHUM DADO INSERIDO/ATUALIZADO!!!");
    // }
  }

  if (id) {
    // TODO: mudar secret para o .env
    const secret = "keyboard_cat";
    const { cookie } = await squishy_cookies.createSignedCookie(
      "id",
      id,
      secret,
      {
        path: "/",
        httpOnly: true,
        // TODO: pq ñ é possível setar o cookie após o redirect?
        // sameSite: "Strict",
        secure: config.environment === "production",
        maxAge: 60 * 60 * 24,
      },
    );
    return new Response("", {
      status: 302,
      headers: {
        Location: config.base_url,
        // ...headers
        "set-cookie": cookie,
      },
    });
  }
  return Response.redirect(config.base_url);
}

export const handler: Handlers = {
  async GET(request, ctx) {
    const providerType = ctx.params.provider.toLowerCase();
    switch (providerType) {
      case Providers.github: {
        const tokens = await denoGrant.getToken(Providers.github, request.url);
        if (tokens) {
          return upsertGithubProfile(request, tokens.accessToken);
        }
      }
    }
    return Response.redirect(config.base_url);
  },
};
