import { Handlers } from "$fresh/server.ts";
import Layout from "@/components/Layout.tsx";
import Landing from "@/components/Landing.tsx";
import config from "@config";
import Alert from "@/components/Alert.tsx";

export const handler: Handlers = {
  GET(req, ctx) {
    if (ctx.state.userId) {
      return Response.redirect(`${config.base_url}/dashboard`);
    }
    // return ctx.render(null);
    const params = new URLSearchParams(req.url.split("?")[1]);
    return ctx.render({
      message: params.get("message")
    });
  },
};

export default function Home({ data }: { data: { message: string; } }) {
  return (
    <Layout user={null}>
      {/* {console.log(data.message)} */}
      {data.message && <Alert message={data.message} />}
      <Landing />
    </Layout>
  );
}
