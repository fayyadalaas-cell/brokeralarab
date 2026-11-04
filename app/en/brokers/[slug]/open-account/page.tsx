
import type { Metadata } from "next";
import NewAccountGuideV2En, {
  getV2EnMetadata,
} from "./NewAccountGuideV2En";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  return getV2EnMetadata(slug);
}

export default async function OpenAccountGuideEnPage({
  params,
}: Props) {
  const { slug } = await params;

  return <NewAccountGuideV2En slug={slug} />;
}
