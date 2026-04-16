"use client";

import { usePathname } from "next/navigation";
import ArabicHeader from "@/app/components/ArabicHeader";
import EnglishHeader from "@/app/components/EnglishHeader";

export default function HeaderSwitcher(props: any) {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");

  if (isEnglish) {
    return <EnglishHeader {...props} />;
  }

  return <ArabicHeader {...props} />;
}