import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import User from "@/db/models/UserTable.ts";
import Users from "@/islands/Users.tsx";

export default function Home({ data }: PageProps<User[]>) {
  return (
    <div class="p-4 mx-auto max-w-screen-md">
      <a
        href="/auth/github"
        class="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Login com GitHub
      </a>
    </div>
  );
}
