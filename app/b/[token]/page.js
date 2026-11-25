import "../../form.css";
import { getClient } from "@/lib/db";
import FormApp from "./FormApp";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { token } = await params;
  const c = await getClient(token).catch(() => null);
  return { title: c?.lang === "en" ? "Pronnovo · Discovery questionnaire" : "Pronnovo · שאלון היכרות" };
}

export default async function Page({ params, searchParams }) {
  const { token } = await params;
  const sp = await searchParams;
  const c = await getClient(token);
  const boot = c
    ? { token: c.token, client: c.client, project: c.project, lang: c.lang, submitted: c.status === "submitted", data: c.data || {} }
    : { notFound: true, lang: sp?.lang === "en" ? "en" : "he" };
  return <FormApp boot={boot} />;
}
