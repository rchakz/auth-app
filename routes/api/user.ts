// import { HandlerContext } from "$fresh/server.ts";
import db from "@db";
import { Handlers } from "$fresh/server.ts";
import { State } from "@/schemas/State.ts";
import { jsonb_agg } from "@db";
import { UserWithSocialProfiles } from "@/db/tables/CombinedTables.ts";
import config from "@config";

//mesmo em routes/dashboard/index.tsx
export const handler: Handlers<UserWithSocialProfiles | null, State> = {
  async GET(_req, _ctx) {
    if (_ctx.state.userId) {
      const user = await db
        .selectFrom("user")
        .selectAll()
        .select(
          (qb) =>
            jsonb_agg(
              qb.selectFrom("social_profile")
                .selectAll()
                .whereRef("social_profile.user_id", "=", "user.id"),
            )
              .as("social_profiles"),
        )
        .where("id", "=", _ctx.state.userId)
        .executeTakeFirst();
      if (user) {
        // return ctx.render(user as unknown as UserWithSocialProfiles);
        return Response.json(user);
      }
    }
    return Response.redirect(`${config.base_url}?message=Não Autorizado`);
  },
};

// export const handler = async (
//   _req: Request,
//   _ctx: HandlerContext,
// ): Promise<Response> => {
//   const user = await db
//     .selectFrom("user")
//     .selectAll()
//     .executeTakeFirst();
//   return Response.json(user);
// };
