"use client";

import Script from "next/script";

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        id="ga-loader"
        src="https://www.googletagmanager.com/gtag/js?id=G-4V7NM48JS7"
        strategy="afterInteractive"
      />
      <Script
        id="ga-inline"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'G-4V7NM48JS7');
          `,
        }}
      />
    </>
  );
}