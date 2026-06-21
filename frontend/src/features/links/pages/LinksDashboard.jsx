import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Filter, Plus, Search } from "lucide-react";
import LinkList from "../components/LinkList";
import useLinks from "../hooks/useLinks";
import { getAuthSession } from "../../auth/services/auth.storage";
import DashboardLayout from "../../../shared/layouts/DashboardLayout";
import Loader from "../../../shared/components/Loader";

const LinksDashboard = () => {
  const { error, fetchLinks, loading, removeLink, toggleLinkStatus } = useLinks();
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);
  const [query, setQuery] = useState("");
  const username = getAuthSession()?.username;
  const demoLinks = [
    { _id: "1", title: "Read my latest essay on design systems", url: "alexrivera.substack.com/p/systems", clicks: 1284 },
    { _id: "2", title: "Book a 1:1 design review call", url: "cal.com/alex/review", clicks: 642 },
    { _id: "3", title: "Get the free Figma starter kit", url: "figma.com/@alex/starter", clicks: 3120 },
    { _id: "4", title: "Follow my work on Dribbble", url: "dribbble.com/alexrivera", clicks: 489 },
    { _id: "5", title: "Subscribe to the weekly newsletter", url: "alexrivera.substack.com", clicks: 2187 },
  ];
  const sourceLinks = username ? links : demoLinks;
  const displayedLinks = sourceLinks.filter((link) =>
    `${link.title} ${link.url}`.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (!username) {
      return;
    }

    fetchLinks({ username })
      .then((data) => setLinks(data))
      .catch(() => setLinks([]));
  }, [fetchLinks, username]);

  const handleDelete = async (link) => {
    const linkId = link._id || link.id;
    setLinks((currentLinks) => currentLinks.filter((item) => (item._id || item.id) !== linkId));

    if (linkId) {
      await removeLink({ linkId }).catch(() => fetchLinks({ username }).then(setLinks).catch(() => {}));
    }
  };

  const handleToggle = async (link) => {
    const linkId = link._id || link.id;
    const nextActive = !(link.isActive ?? link.active ?? true);
    setLinks((currentLinks) =>
      currentLinks.map((item) =>
        (item._id || item.id) === linkId ? { ...item, isActive: nextActive } : item
      )
    );

    if (linkId) {
      await toggleLinkStatus({ linkId, isActive: nextActive }).catch(() =>
        fetchLinks({ username }).then(setLinks).catch(() => {})
      );
    }
  };

  const handleEdit = (link) => {
    const linkId = link._id || link.id;

    if (linkId) {
      navigate(`/dashboard/links/${linkId}/edit`, { state: { link } });
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-10 flex items-start justify-between gap-4">
        <div>
          <h1 className="display-title display-gradient text-5xl">
            My links
          </h1>
          <p className="mt-3 text-lg font-medium text-zinc-500">
            Drag to reorder. Click a card to edit, preview or share.
          </p>
        </div>
        <Link
          to="/dashboard/links/new"
          className="hidden h-12 items-center gap-2 rounded-[18px] bg-[#101116] px-6 text-base font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-black sm:inline-flex"
        >
          <Plus size={20} />
          New link
        </Link>
      </div>

      <div className="mb-7 flex flex-col gap-3 xl:flex-row">
        <label className="flex h-12 flex-1 items-center gap-3 rounded-full border border-[#dedbd3] bg-white px-4 text-zinc-500 shadow-sm">
          <Search size={19} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-zinc-500"
            placeholder="Search by title, URL or tag..."
          />
        </label>
        <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#dedbd3] bg-white px-5 text-base font-semibold text-[#23242a]">
          <Filter size={18} />
          All links
        </button>
        <div className="flex h-12 rounded-full border border-[#dedbd3] bg-white p-0.5 text-sm font-semibold text-zinc-500">
          {["All", "Active", "Archived"].map((item) => (
            <button
              key={item}
              className={`rounded-full px-5 ${item === "All" ? "bg-[#101116] text-white" : ""}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Loader label="Loading links..." />
      ) : (
        <LinkList
          links={displayedLinks}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onToggle={handleToggle}
        />
      )}
      {error ? <p className="mt-4 text-sm font-semibold text-red-600">{error}</p> : null}
    </DashboardLayout>
  );
};

export default LinksDashboard;

