import { UnknownPageProps } from "$fresh/server.ts";
import Layout from "@/components/Layout.tsx";
import Alert from "@/components/Alert.tsx";
import { pageTitle } from "@/signals/index.ts";

export default function NotFoundPage({ url }: UnknownPageProps) {
  const message = url.searchParams.get("message");
  pageTitle.value = "Não encontrado";
  return (
    // <Layout flexCol>
    <Layout user={null}>
      <Alert
        message={message ||
          `404 não encontrado ou não implementado: ${url.pathname}`}
      />
    </Layout>
  );
}
