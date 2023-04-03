import { Handlers } from "$fresh/server.ts";
import * as cookie from "std/http/cookie.ts";

import config from "@config";

export const handler: Handlers = {
  GET(req, ctx) {
    // console.log("cookie: ", req.headers.get("cookie"));
    const response = new Response("", {
      status: 302,
      headers: {
        Location: config.base_url,
      },
    });
    cookie.deleteCookie(response.headers, "id");
    return response;
  },
};
