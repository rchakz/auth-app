import { Handlers } from "$fresh/server.ts";
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
    const redirectUrl =
      `${config.base_url}/not-found?message=Provedor "${providerString}" desconhecido ou não implementado.`;
    return Response.redirect(redirectUrl);
  },
};
