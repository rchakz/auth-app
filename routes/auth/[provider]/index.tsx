import { Handlers } from "$fresh/server.ts";
// import { Providers } from "deno_grant";
import denoGrant, { ProvidersMap } from "@denoGrant";
import config from "@config";

export const handler: Handlers = {
  GET(_, ctx) {
    const providerString = ctx.params.provider.toLowerCase();
    const provider = ProvidersMap.get(providerString);
    if (provider) {
      const authorizationUrl = denoGrant.getAuthorizationUri(provider);
      if (authorizationUrl) {
        return Response.redirect(authorizationUrl);
      }
    }
    // TODO: mostrar mensagem de erro ao invés de um redirect instantaneo
    // return Response.redirect(config.base_url);
    const redirectUrl =
      `${config.base_url}/not-found?message=Provedor "${providerString}" desconhecido ou não implementado.`;
    return Response.redirect(redirectUrl);
  },
};
