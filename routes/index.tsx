// import { Head } from "$fresh/runtime.ts";
// import { Handlers, PageProps } from "$fresh/server.ts";
// import User from "@/db/models/UserTable.ts";
// import Users from "@/islands/Users.tsx";

import Layout from "../components/Layout.tsx";

// TODO: criar um middleware de análise de cookie

export default function Home() {
  return (
    <Layout>
      <h3 class="text-3xl py-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </h3>
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
          class="cursor-pointer text-white bg-[#595959] hover:bg-[#808080] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Login com GitHub
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
