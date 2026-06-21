import LinkItem from "./LinkItem";

const LinkList = ({ links = [], onDelete, onEdit, onToggle }) => {
  const safeLinks = Array.isArray(links) ? links : [];

  if (safeLinks.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-[#d9d4ca] bg-white p-10 text-center shadow-sm">
        <h2 className="text-lg font-black text-zinc-950">No links yet</h2>
        <p className="mt-2 text-sm text-zinc-500">
          Create your first link to start building your public profile.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {safeLinks.map((link) => (
        <LinkItem
          key={link._id || link.url}
          link={link}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default LinkList;
