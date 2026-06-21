const fallbackSocials = (username) => [
    { label: "X", href: `https://x.com/${username}` },
    { label: "Instagram", href: `https://instagram.com/${username}` },
    { label: "LinkedIn", href: `https://linkedin.com/in/${username}` },
];

const SocialLinks = ({ socials, username }) => {
  const socialLinks = Array.isArray(socials) && socials.length > 0 ? socials : fallbackSocials(username);

  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      {socialLinks.map((item) => (
        <a
          key={item.label || item.platform}
          href={item.href || item.url}
          target="_blank"
          rel="noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-zinc-700 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:bg-white"
          aria-label={item.label || item.platform}
        >
          <span className="brand-font text-xs font-extrabold">
            {(item.platform || item.label || "URL").slice(0, 2).toUpperCase()}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
