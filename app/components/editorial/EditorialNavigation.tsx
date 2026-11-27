import Link from "next/link";

import {
  LayoutGrid,
  ChartCandlestick,
  Globe2,
  Newspaper,
  CalendarDays,
  BookOpen,
} from "lucide-react";

import {
  EDITORIAL_CATEGORIES,
  getEditorialCategoryHref,
  getEditorialCategories,
  type EditorialCategory,
  type EditorialLanguage,
} from "@/lib/editorial";

/* =========================================================
   BROKER ALARAB
   SHARED EDITORIAL NAVIGATION
   Arabic & English
========================================================= */

type EditorialNavigationProps = {
  language: EditorialLanguage;
  activeCategory?: string;
  categories?: EditorialCategory[];
};

/* =========================================================
   CATEGORY ICONS
========================================================= */

function getCategoryIcon(slug: string) {

  switch (slug) {

    case EDITORIAL_CATEGORIES.MARKETS:
      return ChartCandlestick;

    case EDITORIAL_CATEGORIES.COUNTRY_GUIDES:
      return Globe2;

    case EDITORIAL_CATEGORIES.BROKER_NEWS:
      return Newspaper;

    case EDITORIAL_CATEGORIES.EVENTS:
      return CalendarDays;

    default:
      return BookOpen;

  }

}

/* =========================================================
   MAIN NAVIGATION
========================================================= */

export default async function EditorialNavigation({
  language,
  activeCategory,
  categories: providedCategories,
}: EditorialNavigationProps) {

  const isArabic = language === "ar";

  const prefix = isArabic ? "" : "/en";

  const categories =
    providedCategories ??
    (await getEditorialCategories());

  const items = [

    {
      slug: "all",
      label: isArabic
        ? "جميع المقالات"
        : "All Articles",
      href: `${prefix}/articles`,
      icon: LayoutGrid,
    },

    ...categories.map((category) => ({

      slug: category.slug,

      label: isArabic
        ? category.name_ar
        : category.name_en,

      href: getEditorialCategoryHref(
        category.slug,
        language
      ),

      icon: getCategoryIcon(category.slug),

    })),

  ];

  return (

    <nav
      dir={isArabic ? "rtl" : "ltr"}
      aria-label={
        isArabic
          ? "أقسام المقالات والأخبار"
          : "Editorial Categories"
      }
      className="grid grid-cols-2 gap-2 md:flex md:gap-3 md:[&>a]:flex-1"
    >

      {items.map((item) => {

        const Icon = item.icon;

        const isActive =
          item.slug === (activeCategory || "all");

        return (

          <Link
            key={item.slug}
            href={item.href}
            aria-current={
              isActive ? "page" : undefined
            }
            className={`flex min-h-[46px] min-w-0 items-center justify-center gap-2 rounded-[11px] border px-3 py-3 text-center text-[11px] font-black leading-5 transition-colors sm:text-[13px] md:px-4 ${
              isActive
                ? "border-[#194b92] bg-[#194b92] text-white"
                : "border-slate-200 bg-[#f8fafc] text-[#243b57] hover:border-blue-200 hover:bg-blue-50"
            }`}
          >

            <Icon
              size={16}
              strokeWidth={1.8}
              className="shrink-0"
              aria-hidden="true"
            />

            <span>
              {item.label}
            </span>

          </Link>

        );

      })}

    </nav>

  );

}

/* =============== END EDITORIAL NAVIGATION =============== */