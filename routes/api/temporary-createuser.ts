// import { HandlerContext } from "$fresh/server.ts";

// import db from "@db";

// export const handler = async (
//   _req: Request,
//   _ctx: HandlerContext,
// ): Promise<Response> => {
//   const user = await db
//     .insertInto("user")
//     .values({
//       display_name: "usertest",
//     })
//     .returningAll()
//     .executeTakeFirst();
//   return Response.json(user);
// };
