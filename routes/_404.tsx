import { UnknownPageProps } from "$fresh/server.ts";
import Layout from "@/components/Layout.tsx";
// import Alert from "@/components/Alert.tsx";
// import { pageTitle } from "../signals/index.ts";

export default function NotFoundPage({ url }: UnknownPageProps) {
  const message = url.searchParams.get("message");
  // pageTitle.value = "Not Found";
  return (
    // <Layout flexCol>
    // <Alert message={message || `404 not found: ${url.pathname}`} />
    // </Layout>
    <Layout>
      <div
        class="m-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <span class="font-medium">
          {/* {message ? <p>{message}</p> : <p>404 not found: {url.pathname}</p>} */}
          {message || `404 não encontrado ou não implementado: ${url.pathname}`}
        </span>
      </div>
    </Layout>
  );
}

// import { HandlerContext, UnknownPageProps } from "$fresh/server.ts";
// import Layout from "@/components/Layout.tsx";
// import Alert from "@/components/Alert.tsx";
// import { pageTitle } from "../signals/index.ts";

// export function handler(req: Request, ctx: HandlerContext) {
//   const acceptHeader = req.headers.get("accept");
//   if (acceptHeader && acceptHeader.includes("json")) {
//     return new Response(
//       JSON.stringify({
//         message: "Not Found",
//       }),
//       {
//         status: 404,
//         headers: {
//           "content-type": "application/json",
//         },
//       }
//     );
//   }
//   return ctx.render();
// }

// export default function NotFoundPage({ url }: UnknownPageProps) {
//   const message = url.searchParams.get("message");
//   pageTitle.value = "Not Found";
//   return (
//     <Layout flexCol>
//       <Alert message={message || `404 not found: ${url.pathname}`} />
//     </Layout>
//   );
// }
