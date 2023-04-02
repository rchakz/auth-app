// https://fresh.deno.dev/docs/concepts/middleware

import { MiddlewareHandlerContext } from "$fresh/server.ts";
// import UserTable from "@/db/tables/UserTable.ts";
import { squishy_cookies } from "@/deps.ts";
import { State } from "@/schemas/State.ts";

// interface State {
// //   user?: UserTable;
//   userId?: string;
// }

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  //   ctx.state.data = "myData";
  //   console.log("COOKIE VERIFY MIDDLEWARE, req.url: ", req.url);
  const secret = "keyboard_cat";
  const userId = await squishy_cookies.verifySignedCookie(
    req.headers,
    "id",
    secret,
  );
  if (userId) {
    // TODO: pesquisar o id do user, anexar ao request
    // console.log("USER ID OBTIDO: ", userId)
    ctx.state.userId = Number(userId.split(".")[0]);
  }
  //   const cookie = req.headers.get("cookie");
  //   const resp = await ctx.next();
  //   resp.headers.set("server", "fresh server");
  return ctx.next();
}
