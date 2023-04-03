import { FunctionComponent } from "preact";
import PropsWithUser from "@/schemas/PropsWithUser.ts";

// import { Head } from "$fresh/runtime.ts";
// import { Handlers, PageProps } from "$fresh/server.ts";
// // import Counter from "../islands/Counter.tsx";
// // import db from "../db/db.ts";
// import User from "@/models/User.ts";
// // import oauth from "../auth/oauth.ts"

// import Users from "@/islands/Users.tsx";

// // console.log(db)
// // const users = await User.all();
// // console.log(oauth);

// export const handler: Handlers<User[] | null> = {
//   async GET(_, ctx) {
//     // const { username } = ctx.params;
//     const users = await User.all();
//     // console.log({users});
//     return ctx.render(users);
//   },
// };

// export default function Home({ data }: PageProps<User[]>) {
//   return (
//     <>
//       <Head>
//         <title>Fresh App</title>
//       </Head>
//       <div class="p-4 mx-auto max-w-screen-md">
//         <p class="my-6">
//           *Renderizado no servidor.* Usuários: {data.length}
//         </p>
//         <Users />
//       </div>
//     </>
//   );
// }

const Dashboard: FunctionComponent<PropsWithUser> = ({ children, user }) => {
  return (
    <div class="py-3 mb-10">
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
      <p class="py-3">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique
        aspernatur eos dicta quo et ipsam eveniet nam rerum odit libero
        assumenda, eum expedita. Sed earum aliquid ipsa odio illo ipsam. Lorem,
        ipsum dolor sit amet consectetur adipisicing elit. Saepe debitis
        distinctio voluptas, optio suscipit inventore expedita omnis illo sunt
        obcaecati modi, reprehenderit dolorum deleniti maiores tenetur.
        Consequatur nemo hic tempora.
      </p>
    </div>
  );
};
export default Dashboard;
