import { HandlerContext } from "$fresh/server.ts";

import db from "@db";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const users = await db
    .selectFrom("user")
    .selectAll()
    .execute();
  // const profiles = await db
  //   .selectFrom("social_profile")
  //   .where("provider_type", "=", "github")
  //   .selectAll()
  //   .execute();

  return Response.json(users);
};
