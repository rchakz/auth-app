import { Handlers, PageProps } from "$fresh/server.ts";
import { State } from "@/schemas/State.ts";
import db, { jsonb_agg } from "@db";
import { UserWithSocialProfiles } from "@/db/tables/CombinedTables.ts";
import Layout from "@/components/Layout.tsx";
import Dashboard from "@/components/Dashboard.tsx";
import config from "@config";

// https://fresh.deno.dev/docs/getting-started/custom-handlers
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
        return _ctx.render(user as unknown as UserWithSocialProfiles);
      }
    }
    return Response.redirect(`${config.base_url}?message=Não Autorizado`);
  },
};

// TODO: criar um middleware de análise de cookie

export default function Home(
  { data }: PageProps<UserWithSocialProfiles | null>,
) {
  // TODO: usar signal
  return (
    <Layout user={data}>
      <Dashboard user={data} />
    </Layout>
  );
}
