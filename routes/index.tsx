// import { Head } from "$fresh/runtime.ts";
// import { Handlers, PageProps } from "$fresh/server.ts";
// import User from "@/db/models/UserTable.ts";
// import Users from "@/islands/Users.tsx";

import { Handlers, PageProps } from "$fresh/server.ts";
import { State } from "@/schemas/State.ts";
import db, { jsonb_agg } from "@db";
// import UserTable from "@/db/tables/UserTable.ts";
import { UserWithSocialProfiles } from "@/db/tables/CombinedTables.ts";
import Layout from "@/components/Layout.tsx";

// https://fresh.deno.dev/docs/getting-started/custom-handlers
export const handler: Handlers<UserWithSocialProfiles | null, State> = {
  async GET(req, ctx) {
    // const resp = await ctx.render();
    // resp.headers.set("X-Custom-Header", "Hello");
    // console.log(req.url);
    // console.log(ctx.state);
    if (ctx.state.userId) {
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
        .where("id", "=", ctx.state.userId)
        .executeTakeFirst();
      if (user) {
        return ctx.render(user as unknown as UserWithSocialProfiles);
      }
    }
    return ctx.render(null);
  },
};

// TODO: criar um middleware de análise de cookie

export default function Home(
  { data }: PageProps<UserWithSocialProfiles | null>,
) {
  return (
    <Layout user={data || undefined}>
      <h3 class="text-3xl py-3 text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </h3>
      <pre>
        {JSON.stringify(data || "NENHUM USUÁRIO LOGADO", null, 2)}
      </pre>
      <p class="py-1">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique
        aspernatur eos dicta quo et ipsam eveniet nam rerum odit libero
        assumenda, eum expedita. Sed earum aliquid ipsa odio illo ipsam. Lorem,
        ipsum dolor sit amet consectetur adipisicing elit. Saepe debitis
        distinctio voluptas, optio suscipit inventore expedita omnis illo sunt
        obcaecati modi, reprehenderit dolorum deleniti maiores tenetur.
        Consequatur nemo hic tempora.
      </p>
      <div class="flex py-6 w-full justify-center align-center">
        <a
          href="/auth/github"
          class="cursor-pointer flex items-center text-white bg-[#595959] hover:bg-[#606060] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-0 sdark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          <img
            src="/github.svg"
            alt="Login com GitHub"
          />
          Login com GitHub
        </a>
      </div>

      <div class="flex py-0 w-full justify-center align-center">
        <a
          href="/auth/google"
          class="cursor-pointer flex items-center text-black bg-white hover:bg-[#EDEDED] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-20 sdark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          <img
            src="/google.svg"
            alt="Login com Google"
          />
          Login com Goggle
        </a>
      </div>
    </Layout>
  );
}

//   return (
//     <div class="p-4 mx-auto max-w-screen-md">
//       <a
//         href="/auth/github"
//         class="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
//       >
//         Login com GitHub
//       </a>
//     </div>
//   );
// }
