"use client";

export default function ShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const iconBtnClass =
    "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white transition hover:bg-slate-50 hover:border-slate-400";

  const handleFacebookClick = async () => {
    const isMobile =
      /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
        navigator.userAgent
      );

    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
        return;
      } catch {
        // إذا المستخدم سكر نافذة الشير أو فشل، نرجع للفيسبوك العادي
      }
    }

    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
      <div className="mb-3 text-center text-sm font-bold text-slate-700">
        مشاركة الصفحة
      </div>

      <div className="flex items-center justify-center gap-3">
        {/* Facebook */}
        <button
          type="button"
          onClick={handleFacebookClick}
          aria-label="Share on Facebook"
          title="Facebook"
          className={`${iconBtnClass} text-[#1877F2]`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-current"
          >
            <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
          </svg>
        </button>

        {/* X */}
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
          title="X"
          className={`${iconBtnClass} text-black`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-current"
          >
            <path d="M18.244 2H21l-6.73 7.69L22.18 22h-6.2l-4.86-6.35L5.56 22H2.8l7.2-8.23L2 2h6.36l4.39 5.79L18.244 2Zm-1.087 18h1.718L7.425 3.895H5.582L17.157 20Z" />
          </svg>
        </a>

        {/* Telegram */}
        <a
          href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Telegram"
          title="Telegram"
          className={`${iconBtnClass} text-[#229ED9]`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-current"
          >
            <path d="M21.5 4.5 18.4 19c-.2 1-1 1.2-1.8.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8 8.8-8c.4-.3-.1-.5-.5-.2L6.3 12.8 1.7 11.4c-1-.3-1-1 .2-1.5l17.8-6.9c.8-.3 1.5.2 1.3 1.5Z" />
          </svg>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
          title="WhatsApp"
          className={`${iconBtnClass} text-[#25D366]`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="h-5 w-5 fill-current"
          >
            <path d="M19.11 17.21c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.31.2-.58.07-.27-.13-1.12-.41-2.14-1.32-.79-.7-1.33-1.57-1.49-1.84-.16-.27-.02-.41.12-.54.12-.12.27-.31.4-.46.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.61-1.47-.84-2.01-.22-.54-.45-.46-.61-.47h-.52c-.18 0-.46.07-.7.34-.24.27-.92.9-.92 2.19s.94 2.54 1.07 2.71c.13.18 1.85 2.82 4.48 3.95.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.1.5-.07 1.6-.65 1.82-1.28.22-.63.22-1.17.16-1.28-.07-.11-.25-.18-.52-.31Z" />
            <path d="M16.01 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.47 1.73 6.41L3.2 28.8l6.56-1.72a12.73 12.73 0 0 0 6.25 1.61h.01c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.33-6.64-3.75-9.06A12.7 12.7 0 0 0 16.01 3.2Zm0 23.34h-.01a10.6 10.6 0 0 1-5.39-1.47l-.39-.23-3.89 1.02 1.04-3.79-.25-.39a10.57 10.57 0 0 1-1.63-5.66c0-5.84 4.75-10.6 10.6-10.6 2.83 0 5.49 1.1 7.49 3.1a10.52 10.52 0 0 1 3.1 7.49c0 5.84-4.75 10.6-10.6 10.6Z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
