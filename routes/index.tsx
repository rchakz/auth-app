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
    <Layout user={data}>
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
      <div class="flex py-6 w-full justify-center justify-center items-center">
        <a
          href="/auth/github"
          class="cursor-pointer flex items-center text-white bg-[#595959] hover:bg-[#606060] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-0 sdark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          <svg height="25" viewBox="0 0 16 16" width="32px" style="fill:white;">
            <path
              fill-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
              0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01
              1.08.58 1.23.82.72 1.21 1.87.87
              2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12
              0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08
              2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0
              .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            />
          </svg>
          Login com GitHub
        </a>
      </div>

      <div class="flex py-0 w-full justify-center align-center">
        <a
          href="/auth/google"
          class="cursor-pointer flex items-center text-black bg-white hover:bg-[#EDEDED] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-20 sdark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 533.5 544.3"
            width="32px"
            height="25"
            style="display:inline-flex; align-items:center;"
          >
            <path
              d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
              fill="#4285f4"
            />
            <path
              d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
              fill="#34a853"
            />
            <path
              d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
              fill="#fbbc04"
            />
            <path
              d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
              fill="#ea4335"
            />
          </svg>
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
