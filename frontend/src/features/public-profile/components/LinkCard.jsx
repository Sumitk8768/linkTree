const getDisplayUrl = (url = "") => {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
};

const LinkCard = ({ link, onClick }) => {
  return (
    <button
      type="button"
      onClick={() => onClick(link)}
      className="group flex min-h-[82px] w-full items-center gap-4 rounded-[22px] bg-white/78 px-5 py-3.5 text-left shadow-[0_12px_32px_rgba(24,24,27,0.09)] ring-1 ring-black/5 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#00bfa5] sm:px-5"
    >
      <span className="brand-font flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#09cbbb] to-[#008fd8] text-base font-extrabold text-white">
        {link.title?.slice(0, 1).toUpperCase() || "L"}
      </span>

      <span className="min-w-0 flex-1">
        <span className="brand-font block truncate text-[14px] font-bold leading-5 text-[#16191f] sm:text-[15px]">
          {link.title}
        </span>
        <span className="mt-0.5 block truncate text-[12px] font-semibold leading-4 text-zinc-500 sm:text-[13px]">
          {getDisplayUrl(link.url)}
        </span>
      </span>

      <span
        aria-hidden="true"
        className="shrink-0 text-xl leading-none text-zinc-500 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#16191f]"
      >
        -&gt;
      </span>
    </button>
  );
};

export default LinkCard;
