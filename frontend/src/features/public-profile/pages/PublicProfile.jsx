import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Share2 } from "lucide-react";
import LinkCard from "../components/LinkCard";
import ProfileHeader from "../components/ProfileHeader";
import SocialLinks from "../components/SocialLinks";
import usePublicProfile from "../hooks/usePublicProfile";

const getSafeUrl = (url = "") => {
  if (!url) {
    return "";
  }

  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

const PublicProfile = () => {
  const { username } = useParams();
  const { fetchLinks, handleLinkClick } = usePublicProfile();
  const [links, setLinks] = useState([]);
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLinks({ username })
      .then((data) => {
        setLinks(Array.isArray(data?.links) ? data.links : []);
        setProfile(data?.profile || data?.user || null);
        setMessage(data?.message || "");
        setError("");
      })
      .catch(() => {
        setLinks([]);
        setError("Unable to load links right now.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [fetchLinks, username]);

  const profileName = username || profile?.username || "profile";
  const profileMessage =
    profile?.bio || message || "Creator, founder, and curator of useful links.";

  const openLink = (link) => {
    if (!link.url) {
      return;
    }

    handleLinkClick({ linkId: link._id });
    window.open(getSafeUrl(link.url), "_blank", "noreferrer");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8f4f0] text-[#16191f]">
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_28%_10%,rgba(126,232,206,0.55),transparent_34%),radial-gradient(circle_at_73%_18%,rgba(218,230,244,0.9),transparent_37%),radial-gradient(circle_at_82%_88%,rgba(255,202,217,0.75),transparent_34%),linear-gradient(135deg,#d8fbef_0%,#f7fbff_48%,#fff6f0_100%)]" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[510px] flex-col items-center px-5 pb-10 pt-7 sm:px-6 md:pt-8">
        <header className="flex w-full items-center justify-between">
          <p className="text-xs font-medium text-zinc-500 sm:text-sm">
            linkstack.io/
            <span className="font-bold text-[#16191f]">{profileName}</span>
          </p>

          <button
            type="button"
            aria-label="Share profile"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/55 text-[#16191f] shadow-sm ring-1 ring-black/5 backdrop-blur transition hover:bg-white"
          >
            <Share2 size={17} />
          </button>
        </header>

        <ProfileHeader
          avatarUrl={profile?.avatarUrl || profile?.profileImage}
          message={profileMessage}
          username={profileName}
        />
        <SocialLinks socials={profile?.socials} username={profileName} />

        <section className="mt-9 w-full sm:mt-10">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-[82px] animate-pulse rounded-[22px] bg-white/65 shadow-[0_10px_28px_rgba(27,31,35,0.08)] ring-1 ring-black/5"
                />
              ))}
            </div>
          ) : null}

          {!isLoading && error ? (
            <div className="mb-4 rounded-[22px] bg-white/70 px-5 py-4 text-center text-sm font-semibold text-red-600 shadow-sm ring-1 ring-red-100">
              {error}
            </div>
          ) : null}

          {!isLoading && !error && links.length === 0 ? (
            <div className="rounded-[22px] bg-white/70 px-5 py-8 text-center shadow-sm ring-1 ring-black/5">
              <h2 className="text-base font-semibold text-[#16191f]">No links yet</h2>
              <p className="mt-2 text-sm font-medium text-zinc-500">
                This profile has not added any links.
              </p>
            </div>
          ) : null}

          {!isLoading && !error && links.length > 0 ? (
            <div className="space-y-4">
              {links.map((link) => (
                <LinkCard key={link._id || link.url} link={link} onClick={openLink} />
              ))}
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
};

export default PublicProfile;
