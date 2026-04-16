"use client";

import { usePathname } from "next/navigation";
import ArabicFooter from "@/app/components/ArabicFooter";
import EnglishFooter from "@/app/components/EnglishFooter";

export default function FooterSwitcher() {
  const pathname = usePathname();

  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");

  return isEnglish ? <EnglishFooter /> : <ArabicFooter />;
}