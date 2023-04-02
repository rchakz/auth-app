import { Handlers } from "$fresh/server.ts";
import { Providers } from "deno_grant";
import GithubProfile from "deno_grant/interfaces/profiles/GithubProfile.ts";
import { request_cookie_store, signed_cookie_store } from "@/deps.ts"

import config from "@config";
import denoGrant from "@denoGrant";
import db from "@db";
import ProviderType from "@/constants/ProviderType.ts";
// import { Cookie, setCookie } from "std/http/cookie.ts";
// import { RequestCookieStore } from "request_cookie_store";
// import { SignedCookieStore } from "signed_cookie_store";

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

  console.log("socialProfile:", socialProfile);

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

  // const headers = new Headers();
  // const cookie: Cookie = { name: "id", value: id };
  // setCookie(headers, cookie);

  // const cookieHeader = headers.get("set-cookie");
  // console.log(cookieHeader);

  const resp = new Response("", {
    status: 302,
    headers: { Location: config.base_url },
  });
  console.log("id:", id);
  if (id) {
    const requestStore = new request_cookie_store.RequestCookieStore(request);

    const secret = "keyboard_cat";
    const keyPromise = signed_cookie_store.SignedCookieStore.deriveCryptoKey({ secret });

    const cookieStore = new signed_cookie_store.SignedCookieStore(requestStore, await keyPromise, {
      keyring: [await keyPromise],
    });

    await cookieStore.set({
      name: "id",
      value: id,
      path: "/",
      httpOnly: true,
      sameSite: "strict",

      // TODO: conseguir setar os valores secure e maxAge. trocar a lib?
      // TODO: talvez combinar com setCookie
      // TODO: talvez trocar a lib?

      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
      secure: config.environment === "production",
      maxAge: 60 * 60 * 24,
    });

    // const cookieHeader = requestStore.headers.find(([name]) => name === "cookie") || ["", ""];

    // console.log("all headers:", requestStore.headers);

    // console.log(cookieHeader);

    requestStore.headers.forEach(([key, value]) => {
      if (key === "Set-Cookie") {
        resp.headers.append(key, value);
      }
    });

    // resp.headers.append("Set-Cookie", cookieHeader[1]);

    // await cookieStore.set("id", id);
    // assert(!emptyStore.headers.map(x => x[1]).includes('foo.sig=Sd_7Nz01uxBspv_y6Lqs8gLXXYEe8iFEN8fNouVNLzI'));

    // const signedId = await cookieStore.get("id")

    // await cookieStore.set({
    //   // path: "/",
    //   // httpOnly: true,
    //   // sameSite: "strict",
    //   // secure: config.environment === "production",
    //   name: "id",
    //   // maxAge: 60 * 60 * 24,
    //   value: id,
    // });

    const signedCookie = await cookieStore.get("id");

    console.log(signedCookie);

    // setCookie(resp.headers, {
    //   // ...signedCookie,
    //   //secure: config.environment === "production",
    //   //maxAge: 60 * 60 * 24,

    //   name: "id",
    //   value: signedCookie?.value || "",
    //   path: "/",
    //   httpOnly: true,
    //   sameSite: "Strict",
    //   secure: config.environment === "production",
    //   maxAge: 60 * 60 * 24
    // });
  }
  return resp;
  // return Response.json(profile);
  // return Response.json(config.base_url);
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
